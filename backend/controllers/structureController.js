const Structure = require("../models/Structure");

// Create a new Structure
exports.createStructure = async (req, res) => {
  try {
    const { structureName } = req.body;
    const newStructure = await Structure.create({ structureName });
    res.status(201).json(newStructure);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la structure", error });
  }
};

// Get all Structures
exports.getAllStructures = async (req, res) => {
  try {
    const structures = await Structure.findAll();
    res.status(200).json(structures);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des structures",
        error,
      });
  }
};

// Get a single Structure by ID
exports.getStructureById = async (req, res) => {
  try {
    const { id } = req.params;
    const structure = await Structure.findByPk(id);
    if (!structure) {
      return res.status(404).json({ message: "Structure non trouvée" });
    }
    res.status(200).json(structure);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération de la structure",
        error,
      });
  }
};

// Update a Structure by ID
exports.updateStructure = async (req, res) => {
  try {
    const { id } = req.params;
    const { structureName } = req.body;
    const structure = await Structure.findByPk(id);
    if (!structure) {
      return res.status(404).json({ message: "Structure non trouvée" });
    }
    structure.structureName = structureName;
    await structure.save();
    res.status(200).json(structure);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la mise à jour de la structure",
        error,
      });
  }
};

// Delete a Structure by ID
exports.deleteStructure = async (req, res) => {
  try {
    const { id } = req.params;
    const structure = await Structure.findByPk(id);
    if (!structure) {
      return res.status(404).json({ message: "Structure non trouvée" });
    }
    await structure.destroy();
    res.status(200).json({ message: "Structure supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression de la structure",
        error,
      });
  }
};
