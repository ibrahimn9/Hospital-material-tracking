const Salle = require('../models/Salle');

exports.createSalle = async (req, res) => {
  try {
    const { salleName, bureauID } = req.body;
    const newSalle = await Salle.create({ salleName, bureauID });
    res.status(201).json(newSalle);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la salle", error });
  }
};

exports.getAllSalles = async (req, res) => {
  try {
    const salles = await Salle.findAll();
    res.status(200).json(salles);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des salles", error });
  }
};

exports.getSalleById = async (req, res) => {
  try {
    const salle = await Salle.findByPk(req.params.id);
    if (!salle) {
      return res.status(404).json({ message: "Salle non trouvée" });
    }
    res.status(200).json(salle);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la salle", error });
  }
};

exports.updateSalle = async (req, res) => {
  try {
    const { salleName, bureauID } = req.body;
    const salle = await Salle.findByPk(req.params.id);
    if (!salle) {
      return res.status(404).json({ message: "Salle non trouvée" });
    }
    salle.salleName = salleName;
    salle.bureauID = bureauID;
    await salle.save();
    res.status(200).json(salle);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la salle", error });
  }
};

exports.deleteSalle = async (req, res) => {
  try {
    const salle = await Salle.findByPk(req.params.id);
    if (!salle) {
      return res.status(404).json({ message: "Salle non trouvée" });
    }
    await salle.destroy();
    res.status(200).json({ message: "Salle supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la salle", error });
  }
};
