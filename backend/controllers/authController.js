const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Compte, Personne, Type } = require("../models");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // 1. Check if username and password exist
  if (!username || !password) {
    return next(
      new ApiError(
        "Veuillez fournir un nom d'utilisateur et un mot de passe !",
        400
      )
    );
  }

  // 2. Check if user exists && password is correct
  const user = await Compte.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(
      new ApiError("Nom d'utilisateur ou mot de passe incorrect", 401)
    );
  }

  // 3. Check if the user's Personne info is complete
  const personne = await Personne.findByPk(user.persID);

  if (!personne) {
    return res.status(200).json({
      status: "new_user",
      message: "Veuillez compléter vos informations",
      userID: user.userID,
    });
  }

  // 4. Retrieve user type information
  const userType = await Type.findByPk(user.typeID); // Assuming Type is the model for user types

  // 5. If everything is okay, send JWT token
  const token = signToken(user.userId);

  res.cookie("jwt", token, {
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    token,
    data: {
      user: {
        id: user.userId,
        username: user.username,
        type: userType ? userType.TypeName : null, // Assuming 'name' is the field for type name
      },
    },
  });
});

exports.completePersonneInfo = catchAsync(async (req, res, next) => {
  const { userID, nom, prenom, date_naissance } = req.body;

  const user = await Compte.findByPk(userID);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  const newPersonne = await Personne.create({
    nom,
    prenom,
    date_naissance,
  });

  user.persID = newPersonne.persID;
  await user.save();

  const token = signToken(user.userID);

  res.status(200).json({
    status: "success",
    token,
  });
});

const JWT_SECRET = process.env.JWT_SECRET_KEY;

exports.createUser = async (req, res, next) => {
  try {
    const { nom, prenom, date_naissance, username, password, typeName } =
      req.body;

    // Check if username already exists
    const existingUser = await Compte.findOne({ where: { username } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Le nom d'utilisateur existe déjà" });
    }

    // Create Personne record
    const personne = await Personne.create({ nom, prenom, date_naissance });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find typeID by typeName
    const type = await Type.findOne({ where: { TypeName: typeName } });
    if (!type) {
      return res.status(400).json({ message: "Type de nom invalide" });
    }

    const typeID = type.typeID;

    // Create Compte record
    const user = await Compte.create({
      username,
      password: hashedPassword,
      typeID,
      persID: personne.persID,
    });

    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    next(error);
  }
};

exports.tokenVerify = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user from the database
    const user = await Compte.findOne({
      where: { userId: decoded.id },
      include: [
        { model: Type, attributes: ["TypeName"] },
        {
          model: Personne,
          attributes: ["nom", "prenom"],
        },
      ],
      attributes: ["username", "userId"], // Select necessary fields
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the required data
    res.status(200).json({
      id: user.userId,
      username: user.username,
      type: user.Type.TypeName,
    });
  } catch (error) {
    // Handle token verification error
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    // Catch all other errors
    return next(new ApiError("Token verification failed", 500));
  }
};
