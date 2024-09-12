// routes/structureRoutes.js
const express = require("express");
const router = express.Router();
const structureController = require("../controllers/structureController");

router.post("/", structureController.createStructure);

router.get("/", structureController.getAllStructures);

router.get("/:id", structureController.getStructureById);

router.put("/:id", structureController.updateStructure);

router.delete("/:id", structureController.deleteStructure);

module.exports = router;
