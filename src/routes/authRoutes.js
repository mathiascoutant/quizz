const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await register(username, email, password);
    res.status(201).json({ message: 'Inscription réussie', user: result });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'inscription', error: error.message });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json({ message: 'Connexion réussie', token: result.token });
  } catch (error) {
    res.status(401).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
});

// Route pour vérifier si l'utilisateur est connecté (optionnelle)
router.get('/me', (req, res) => {
  // Cette route nécessiterait un middleware d'authentification
  res.status(200).json({ message: 'Utilisateur authentifié', user: req.user });
});

module.exports = router;
