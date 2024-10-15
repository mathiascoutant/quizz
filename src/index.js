const express = require('express');
const { connectToDatabase } = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à la base de données
connectToDatabase();

// Routes
app.use('/auth', authRoutes);

// Route spécifique pour /register
app.use('/register', (req, res) => {
  res.redirect('/auth/register');
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
