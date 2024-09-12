const Rapport = require("../models/Rapport");
const Compte = require("../models/Compte");
const Demande = require("../models/Demande");
const Personne = require("../models/Personne");

exports.createRapport = async (req, res, next) => {
  const { idDemande, idCompte, context } = req.body;

  try {
    // Check if a rapport already exists for the given idDemande
    let existingRapport = await Rapport.findOne({ where: { idDemande } });

    if (existingRapport) {
      // Update the existing rapport
      existingRapport.context = context;
      existingRapport.idCompte = idCompte;
      existingRapport.date = new Date();

      await existingRapport.save();

      res.status(200).json({
        message: "Rapport updated successfully",
        rapport: existingRapport,
      });
    } else {
      // Create a new rapport
      const newRapport = await Rapport.create({
        idDemande,
        idCompte,
        context,
        date: new Date(),
      });

      res.status(201).json({
        message: "Rapport created successfully",
        rapport: newRapport,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllRapports = async (req, res, next) => {
  try {
    const rapports = await Rapport.findAll({
      include: [
        {
          model: Compte,
          attributes: ["username"],
          include: [
            {
              model: Personne, // Assuming Compte is related to Personne
              attributes: ["nom", "prenom"], // Include nom and prenom from Personne
            },
          ],
        },
        {
          model: Demande,
          attributes: ["type", "desc"],
        },
      ],
    });
    res.status(200).json(rapports);
  } catch (error) {
    next(error);
  }
};
