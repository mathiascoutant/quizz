import express from 'express';
import * as authController from '../controllers/authController.js';

import { protect } from '../controllers/authController.js';
const router = express.Router();

// Route pour l'inscription
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/status', protect, authController.status);

router.get('/some-route', (req, res) => {
    // Ajoutez ici la logique de votre route
    res.send('Réponse de la route GET');
  });


export default router;
