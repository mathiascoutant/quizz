const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route pour l'inscription
router.post('/register', authController.register);

// Route pour la connexion
router.post('/login', authController.login);

// Route pour la déconnexion
router.post('/logout', authController.logout);

// Route pour vérifier l'état de l'authentification
router.get('/check-auth', authController.checkAuth);

module.exports = router;

