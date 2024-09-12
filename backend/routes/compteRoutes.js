const express = require('express');
const router = express.Router();
const compteController = require('../controllers/compteController');

// CRUD routes
router.post('/', compteController.createCompte); 
router.get('/', compteController.getAllComptes); 
router.get('/:id', compteController.getCompteById);
router.put('/:id', compteController.updateCompte); 
router.delete('/:id', compteController.deleteCompte);

module.exports = router;
