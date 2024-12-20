import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import mongoose from 'mongoose';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { JWT_SECRET } from '../utils/jwtUtils.js';
import { BadgeService } from '../services/badgeService.js';




export const register = async (req, res) => {
  try {
    console.log('Début de l\'inscription');
    const { firstname, lastname, pseudo, email, password } = req.body;
    
    if (!firstname || !lastname || !pseudo || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }


    console.log('Recherche d\'un utilisateur existant');
    const existingUser = await User.findOne({ where: { [Op.or]: [{ pseudo }, { email }] } });
    if (existingUser) {
      return res.status(400).json({ message: "Un utilisateur avec ce nom d'utilisateur ou cet email existe déjà." });
    }

    const createdPassword = await hashPassword(password);
    if (!createdPassword) {
      return res.status(400).json({ message: 'Erreur lors de la création du mot de passe' });
    } 
    console.log("passwrorddd", createdPassword);
    const newUser = await User.create({
      firstname,
      lastname,
      pseudo,
      email,
      password: createdPassword
    });

    console.log('Utilisateur créé avec succès');
    res.status(201).json({ message: "Utilisateur enregistré avec succès", userId: newUser.id });
  } catch (error) {
    console.error('Erreur détaillée lors de l\'inscription:', error);
    console.error('État de la connexion MongoDB:', mongoose.connection.readyState);
    res.status(500).json({ message: "Erreur lors de l'inscription", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Email incorrect' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Récupérer les badges de l'utilisateur
    const badges = await BadgeService.getBadgesUser(user.id);

    // Générer un token JWT
    const token = jwt.sign(
      { 
        userId: user.id  // Inclure l'ID de l'utilisateur dans le payload
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Construire l'objet utilisateur sans dataValues
    const userResponse = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      pseudo: user.pseudo,
      email: user.email,
      coins: user.coins,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      badges // Ajouter les badges directement dans l'objet user
    };

    // Envoyer le token et les informations de l'utilisateur au client
    return res.status(200).json({ 
      token, 
      user: userResponse // Utiliser l'objet utilisateur construit
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
};

export const protect = async (req, res, next) => {
  try {
    // Vérifier si le token est présent
    const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Vous n\'êtes pas connecté. Veuillez vous connecter pour accéder à cette ressource.' });
    }

    console.log('Token:', token);

    // Vérifier le token avec la clé secrète en brut
    const decoded = jwt.verify(token, JWT_SECRET); // Remplacez 'votre_clé_secrète' par votre clé secrète
    console.log('User ID extrait du token:', decoded.userId);

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

export const restrictTo = async (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Vous n\'avez pas la permission d\'effectuer cette action' });
    }
    next();
  };
};

export const status = async (req, res) => {
  try {
    // L'utilisateur est déjà protégé par la fonction protect
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur à partir de la requête

    // Récupérer les informations de l'utilisateur
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Retourner les informations de l'utilisateur
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des informations de l\'utilisateur', error: error.message });
  }
};


