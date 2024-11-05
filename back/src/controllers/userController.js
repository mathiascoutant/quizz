import { User } from '../models/userModel.js';
import { hashPassword } from '../utils/passwordUtils.js';
import jwt from 'jsonwebtoken';
import { UserCoins } from '../models/coinsUserModel.js';

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { pseudo, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ pseudo, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès", userId: newUser._id });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { pseudo, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { pseudo, email },
      { new: true }
    ).select('-password');
    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: "Token manquant" });
    }
    
    //console.log("Token reçu:", token);

    const decodedToken = jwt.verify(token, "c54bb676c70ec4708074f3e81adc224c87ce60c7ebd9954c0626045f61b6d7c7b9dd67cdcfa9b74314806c9288caef228ccb0ca0a8465733d0cef3afc78d82d2");
    
    //console.log("Token décodé:", decodedToken);

    // Vérifier si l'ID de l'utilisateur est présent dans le token
    if (!decodedToken.id && !decodedToken.userId) {
      return res.status(400).json({ message: "ID de l'utilisateur manquant dans le token" });
    }

    const userId = decodedToken.id || decodedToken.userId;

    //console.log("ID utilisateur:", userId);

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur détaillée:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token invalide", error: error.message });
    }
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getUserCoins = async (req, res) => {
  try {
    // Récupérer le token depuis les paramètres de l'URL
    const token = req.query.token; 
    
    // Vérifier si le token est présent
    if (!token) {
      return res.status(400).json({ message: "Token manquant" });
    }
    
    console.log("Token reçu:", token);

    // Vérifier et décoder le token
    const decodedToken = jwt.verify(token, "c54bb676c70ec4708074f3e81adc224c87ce60c7ebd9954c0626045f61b6d7c7b9dd67cdcfa9b74314806c9288caef228ccb0ca0a8465733d0cef3afc78d82d2");
    
    console.log("Token décodé:", decodedToken);

    // Vérifier si l'ID de l'utilisateur est présent dans le token
    if (!decodedToken.id && !decodedToken.userId) {
      return res.status(400).json({ message: "ID de l'utilisateur manquant dans le token" });
    }

    const userId = decodedToken.id || decodedToken.userId;

    console.log("ID utilisateur:", userId);

    // Chercher l'utilisateur dans la collection UserCoins
    const user = await UserCoins.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Récupérer les coins de l'utilisateur
    const coins = user.coins; // Assurez-vous que la colonne coins existe dans le modèle User

    res.status(200).json({ coins });
  } catch (error) {
    console.error("Erreur détaillée:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token invalide", error: error.message });
    }
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
