const express = require('express');
const materialController = require('../controllers/materialController');
const router = express.Router();

// CRUD Routes for Material
router.post('/materials', materialController.createMaterial);
router.get('/materials', materialController.getAllMaterials);
router.get('/materials/:id', materialController.getMaterialById);
router.put('/materials/:id', materialController.updateMaterial);
router.delete('/materials/:id', materialController.deleteMaterial);

module.exports = router;
