const Compte = require("../models/Compte");
const Personne = require("../models/Personne");

// Create a new Compte
exports.createCompte = async (req, res) => {
  try {
    const { username, password, typeID, persID } = req.body;
    const newCompte = await Compte.create({
      username,
      password,
      typeID,
      persID,
    });
    res.status(201).json(newCompte);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création du compte", error });
  }
};

// Get all Comptes
exports.getAllComptes = async (req, res) => {
  try {
    const comptes = await Compte.findAll({
      include: [
        {
          model: Personne,
          attributes: ["nom", "prenom", "date_naissance"],
        },
      ],
    });
    res.status(200).json(comptes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des comptes", error });
  }
};

// Get one Compte by ID
exports.getCompteById = async (req, res) => {
  try {
    const compte = await Compte.findByPk(req.params.id);
    if (!compte) {
      return res.status(404).json({ message: "Compte non trouvé" });
    }
    res.status(200).json(compte);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du compte", error });
  }
};

// Update a Compte
exports.updateCompte = async (req, res) => {
  try {
    const { username, password, typeID, persID, nom, prenom, date_naissance } =
      req.body;

    // Find the Compte by its ID
    const compte = await Compte.findByPk(req.params.id);
    if (!compte) {
      return res.status(404).json({ message: "Compte non trouvé" });
    }

    // Update Compte fields
    compte.username = username;
    compte.password = password;
    compte.typeID = typeID;
    compte.persID = persID;
    await compte.save();

    // Find the associated Personne by persID
    const personne = await Personne.findByPk(compte.persID);
    if (!personne) {
      return res.status(404).json({ message: "Personne non trouvée" });
    }

    // Update Personne fields
    personne.nom = nom;
    personne.prenom = prenom;
    personne.date_naissance = date_naissance;
    await personne.save();

    // Return the updated compte and personne data
    res.status(200).json({ compte, personne });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du compte", error });
  }
};

// Delete a Compte
exports.deleteCompte = async (req, res) => {
  try {
    const compte = await Compte.findByPk(req.params.id);
    if (!compte) {
      return res.status(404).json({ message: "Compte non trouvé" });
    }
    await compte.destroy();
    res.status(200).json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du compte", error });
  }
};
