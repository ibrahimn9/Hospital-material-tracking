const express = require("express");
const rapportController = require("../controllers/rapportController");
const router = express.Router();

// CRUD Routes for Material
router.post("/", rapportController.createRapport);
router.get("/", rapportController.getAllRapports);

module.exports = router;
