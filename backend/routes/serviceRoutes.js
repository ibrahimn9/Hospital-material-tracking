const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// CRUD operations
router.post('/', serviceController.createService);
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
