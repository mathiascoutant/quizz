import express from 'express';
import * as userController from '../controllers/userController.js';
const router = express.Router();

// Route pour l'inscription
router.get('/', userController.getUserProfile);
router.get('/coins', userController.getUserCoins);

router.get('/some-route', (req, res) => {
    // Ajoutez ici la logique de votre route
    res.send('Réponse de la route GET');
  });


export default router;
