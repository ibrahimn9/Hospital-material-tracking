const Material = require("../models/Material");
const State = require("../models/State");

// Create a new material
exports.createMaterial = async (req, res) => {
  try {
    const newMaterial = await Material.create(req.body);
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ message: "Failed to create material", error });
  }
};

// Get all materials
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.findAll({
      include: [
        {
          model: State,
          attributes: ["stateName"], // Specify the attributes to include from the State model
        },
      ],
    });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve materials", error });
  }
};

// Get material by ID
exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findByPk(req.params.id);
    if (material) {
      res.status(200).json(material);
    } else {
      res.status(404).json({ message: "Material not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve material", error });
  }
};

// Update a material by ID
exports.updateMaterial = async (req, res) => {
  try {
    const [updated] = await Material.update(req.body, {
      where: { materialID: req.params.id },
    });

    if (updated) {
      const updatedMaterial = await Material.findByPk(req.params.id);
      res.status(200).json(updatedMaterial);
    } else {
      res.status(404).json({ message: "Material not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update material", error });
  }
};

// Delete a material by ID
exports.deleteMaterial = async (req, res) => {
  try {
    const deleted = await Material.destroy({
      where: { materialID: req.params.id },
    });

    if (deleted) {
      res.status(200).json({ message: "Material deleted successfully" });
    } else {
      res.status(404).json({ message: "Material not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete material", error });
  }
};
