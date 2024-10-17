import express from 'express';
import authRoutes from '../back/src/routes/authRoutes.js';
import formRoutes from '../back/src/routes/formRoutes.js';
// import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Utilisation des routes d'authentification
app.use('/auth', authRoutes);
app.use('/', formRoutes);
// app.use('/users', userRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});


export { app };
