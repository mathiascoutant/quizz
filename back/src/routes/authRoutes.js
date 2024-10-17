import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Route pour l'inscription
router.post('/register', authController.register);
router.post('/login', authController.login);


export default router;
