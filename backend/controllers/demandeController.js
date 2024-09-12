const Demande = require("../models/Demande");
const Compte = require("../models/Compte");
const ApiError = require("../utils/ApiError");
const Rapport = require("../models/Rapport"); // Assuming you have an error handler

// Get all demandes
exports.getAllDemandes = async (req, res, next) => {
  try {
    const demandes = await Demande.findAll();
    res.status(200).json(demandes);
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};

// Create a new demande
exports.createDemande = async (req, res, next) => {
  const { type, desc, idCompte } = req.body;

  try {
    const demande = await Demande.create({
      idCompte,
      type,
      desc,
      date: new Date(), // Automatically generate current date
    });

    res.status(201).json(demande);
  } catch (error) {
    next(error);
  }
};

// Get a demande by ID
exports.getDemandeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const demande = await Demande.findByPk(id, {
      include: {
        model: Compte,
        attributes: ["username"],
      },
    });

    if (!demande) {
      return next(new ApiError("Demande not found", 404));
    }

    res.status(200).json(demande);
  } catch (error) {
    next(error);
  }
};

// Update a demande
exports.updateDemande = async (req, res, next) => {
  const { id } = req.params;
  const { type, desc, remarque, decision } = req.body;

  console.log(req.body)

  try {
    const demande = await Demande.findByPk(id);

    if (!demande) {
      return next(new ApiError("Demande not found", 404));
    }

    // Update the demande with the new data
    demande.type = type || demande.type;
    demande.desc = desc || demande.desc;
    demande.remarque = remarque || demande.remarque;
    demande.decision = decision || demande.decision;

    await demande.save();

    res.status(200).json(demande);
  } catch (error) {
    next(error);
  }
};

// Delete a demande
exports.deleteDemande = async (req, res, next) => {
  const { id } = req.params;

  try {
    const demande = await Demande.findByPk(id);

    if (!demande) {
      return next(new ApiError("Demande not found", 404));
    }

    await demande.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
