const express = require('express');
const router = express.Router();
const bureauController = require('../controllers/bureauController');

// CRUD operations
router.post('/', bureauController.createBureau);
router.get('/', bureauController.getAllBureaux);
router.get('/:id', bureauController.getBureauById);
router.put('/:id', bureauController.updateBureau);
router.delete('/:id', bureauController.deleteBureau);

module.exports = router;
