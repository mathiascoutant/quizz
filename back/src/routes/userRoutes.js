import express from 'express';
import * as userController from '../controllers/userController.js';
import { protect } from '../controllers/authController.js';
const router = express.Router();

// Route pour l'inscription
router.get('/', userController.getUserProfile);
router.put('/', protect, userController.updateUser);
router.get('/coins', userController.getUserCoins);

router.get('/some-route', (req, res) => {
    // Ajoutez ici la logique de votre route
    res.send('Réponse de la route GET');
  });


export default router;
