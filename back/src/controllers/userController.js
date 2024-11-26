import { UserService } from '../services/userService.js';
import {hashPassword,comparePassword} from '../../src/utils/passwordUtils.js';

export const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json({ message: "Utilisateur créé avec succès", userId: user._id });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

export const updateUser = async (req, res) => {
  console.log('req.body', req.body, req.params.userId);
  try {
    const userId = req.params.userId;
    const { firstname, lastname, pseudo, newPassword, oldPassword, email } = req.body;
    
    // Récupérer l'utilisateur actuel
    const user = await UserService.getUserById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    let updatedFields = {};

    // Vérifier et mettre à jour le mot de passe si nécessaire
    if (newPassword && oldPassword) {
      const isPasswordValid = await comparePassword(oldPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "L'ancien mot de passe est incorrect" });
      }
      // Hacher le nouveau mot de passe
      const hashedPassword = await hashPassword(newPassword);
      updatedFields.password = hashedPassword;
      console.log('updatedFields', updatedFields);
    }

    // Vérifier les autres champs et les mettre à jour si présents
    if (firstname) updatedFields.firstname = firstname;
    if (lastname) updatedFields.lastname = lastname;
    if (pseudo) {
      // Vérifier si le pseudo est déjà utilisé
      const existingUser = await UserService.getUserByPseudo(pseudo);   
      if (existingUser) return res.status(400).json({ message: "Ce pseudo est déjà utilisé" });
      updatedFields.pseudo = pseudo;
    }

    if (email) updatedFields.email = email;

    // Appeler le service pour mettre à jour l'utilisateur
    const updatedUser = await UserService.updateUser(userId, updatedFields);
    if (!updatedUser) return res.status(404).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });

    res.status(200).json({ message: "Utilisateur mis à jour avec succès", updatedUser });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour de l'utilisateur", error: error.message });
  }
};



export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserService.deleteUser(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(400).json({ message: "Token manquant" });

    const user = await UserService.getUserProfile(token);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token invalide", error: error.message });
    }
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getUserCoins = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(400).json({ message: "Token manquant" });

    const coins = await UserService.getUserCoins(token);
    if (coins === null) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.status(200).json({ coins });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token invalide", error: error.message });
    }
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getTopUsersByCoins = async (req, res) => {
  try {
    const topUsers = await UserService.getTopUsersByCoins();
    res.status(200).json(topUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserPosition = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur actuel
    const position = await UserService.getUserPositionByCoins(userId);
    res.status(200).json({ position });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopUsersWithPosition = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur actuel
    const result = await UserService.getTopUsersWithPosition(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
