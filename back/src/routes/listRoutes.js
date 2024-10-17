import express from 'express';
import * as quizzController from '../controllers/quizzController.js';
import * as levelController from '../controllers/levelController.js';
const router = express.Router();

// Route pour l'inscription
router.get('/categories', quizzController.getCategories);
router.get('/levels', levelController.getLevels);

router.get('/some-route', (req, res) => {
    // Ajoutez ici la logique de votre route
    res.send('Réponse de la route GET');
  });


export default router;
