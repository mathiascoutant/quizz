import express from 'express';
import cors from 'cors';
import authRoutes from '../back/src/routes/authRoutes.js';
import listRoutes from '../back/src/routes/listRoutes.js';
import quizzRoutes from '../back/src/routes/quizzRoutes.js';
import userRoutes from '../back/src/routes/userRoutes.js';

const app = express();

// Configuration de CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middleware pour parser le JSON
app.use(express.json());

// Utilisation des routes d'authentification
app.use('/auth', authRoutes);
app.use('/list', listRoutes);
app.use('/quizz', quizzRoutes);
app.use('/profile', userRoutes);
// app.use('/users', userRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});


export { app };