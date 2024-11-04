import express from 'express';
import cors from 'cors';
import authRoutes from '../back/src/routes/authRoutes.js';
import userRoutes from '../back/src/routes/userRoutes.js';
import formRoutes from '../back/src/routes/formRoutes.js';
import userAnswerRoutes from '../back/src/routes/userAnswerRoutes.js';
import couponRoutes from '../back/src/routes/couponRoutes.js';
import userCouponRoutes from '../back/src/routes/userCouponRoutes.js';
import difficultyRoutes from '../back/src/routes/difficultyRoutes.js';
import categoryRoutes from '../back/src/routes/categoryRoutes.js';

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
app.use('/profile', userRoutes);
app.use('/api/quizz', formRoutes);
app.use('/api/useranswers', userAnswerRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/user-coupons', userCouponRoutes);
app.use('/api/levels', difficultyRoutes);
app.use('/api/categories', categoryRoutes);
// app.use('/users', userRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});


export { app };