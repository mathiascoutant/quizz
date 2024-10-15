const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // Vérifier si le token est présent
    const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Vous n\'êtes pas connecté. Veuillez vous connecter pour accéder à cette ressource.' });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifier si l'utilisateur existe toujours
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res.status(401).json({ message: 'L\'utilisateur associé à ce token n\'existe plus.' });
    }

    // Accorder l'accès à la route protégée
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide ou expiré', error: error.message });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Vous n\'avez pas la permission d\'effectuer cette action' });
    }
    next();
  };
};
