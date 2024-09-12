const express = require("express");
const router = express.Router();
const demandeController = require("../controllers/demandeController");
const authMiddleware = require("../middlewares/authMiddleware");

// Get all demandes
router.get("/", demandeController.getAllDemandes);

router.post("/", demandeController.createDemande);

router.get("/:id", demandeController.getDemandeById);

router.put("/:id", demandeController.updateDemande);

router.delete("/:id", demandeController.deleteDemande);

module.exports = router;
