import express from 'express';
import * as quizzController from '../controllers/quizzController.js';
const router = express.Router();

// Route pour l'inscription
router.get('/enter', quizzController.getEnter);

router.get('/some-route', (req, res) => {
    // Ajoutez ici la logique de votre route
    res.send('Réponse de la route GET');
  });


export default router;
