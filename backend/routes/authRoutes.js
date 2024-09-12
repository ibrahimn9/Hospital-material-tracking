const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/complete-info', authController.completePersonneInfo);
router.post('/create-user', authController.createUser);
router.post('/verifytoken', authController.tokenVerify);

module.exports = router;
