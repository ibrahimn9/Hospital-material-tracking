const Bureau = require('../models/Bureau');

exports.createBureau = async (req, res) => {
  try {
    const { bureauName, servID } = req.body;
    const newBureau = await Bureau.create({ bureauName, servID });
    res.status(201).json(newBureau);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du bureau", error });
  }
};

exports.getAllBureaux = async (req, res) => {
  try {
    const bureaux = await Bureau.findAll();
    res.status(200).json(bureaux);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des bureaux", error });
  }
};

exports.getBureauById = async (req, res) => {
  try {
    const bureau = await Bureau.findByPk(req.params.id);
    if (!bureau) {
      return res.status(404).json({ message: "Bureau non trouvé" });
    }
    res.status(200).json(bureau);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du bureau", error });
  }
};

exports.updateBureau = async (req, res) => {
  try {
    const { bureauName, servID } = req.body;
    const bureau = await Bureau.findByPk(req.params.id);
    if (!bureau) {
      return res.status(404).json({ message: "Bureau non trouvé" });
    }
    bureau.bureauName = bureauName;
    bureau.servID = servID;
    await bureau.save();
    res.status(200).json(bureau);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du bureau", error });
  }
};

exports.deleteBureau = async (req, res) => {
  try {
    const bureau = await Bureau.findByPk(req.params.id);
    if (!bureau) {
      return res.status(404).json({ message: "Bureau non trouvé" });
    }
    await bureau.destroy();
    res.status(200).json({ message: "Bureau supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du bureau", error });
  }
};
