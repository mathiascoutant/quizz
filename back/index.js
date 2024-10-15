const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API du Quiz !' });
});

// Route pour obtenir tous les quiz (à implémenter)
app.get('/quiz', (req, res) => {
  res.json({ message: 'Liste de tous les quiz (à implémenter)' });
});

// Route pour créer un nouveau quiz (à implémenter)
app.post('/quiz', (req, res) => {
  res.json({ message: 'Création d\'un nouveau quiz (à implémenter)' });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur Quiz démarré sur http://localhost:${port}`);
});
