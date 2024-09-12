const Service = require('../models/Service');

exports.createService = async (req, res) => {
  try {
    const { serviceName, structureID } = req.body;
    const newService = await Service.create({ serviceName, structureID });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du service", error });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des services", error });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service non trouvé" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du service", error });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { serviceName, structureID } = req.body;
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service non trouvé" });
    }
    service.serviceName = serviceName;
    service.structureID = structureID;
    await service.save();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du service", error });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service non trouvé" });
    }
    await service.destroy();
    res.status(200).json({ message: "Service supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du service", error });
  }
};
