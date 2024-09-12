const express = require('express');
const router = express.Router();
const salleController = require('../controllers/salleController');

// CRUD operations
router.post('/', salleController.createSalle);
router.get('/', salleController.getAllSalles);
router.get('/:id', salleController.getSalleById);
router.put('/:id', salleController.updateSalle);
router.delete('/:id', salleController.deleteSalle);

module.exports = router;
