import { UserService } from '../services/userService.js';
import {hashPassword,comparePassword} from '../../src/utils/passwordUtils.js';
import { verifyToken } from '../utils/jwtUtils.js';
import UserBadge from '../models/userBadgeModel.js';
import { User } from '../models/userModel.js';
import BadgeModel from '../models/badgeModel.js';
import { BadgeService } from '../services/badgeService.js';

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
  try {
    const userId = req.params.userId;
    const { firstname, lastname, pseudo, email, newPassword, oldPassword } = req.body;

    // Récupérer l'utilisateur actuel
    const currentUser = await UserService.getUserById(userId);
    if (!currentUser) return res.status(404).json({ message: "Utilisateur non trouvé" });

    let updatedFields = {};
    let hasChanges = false; // Variable pour suivre les changements

    // Vérifier et mettre à jour le pseudo si nécessaire
    if (pseudo) {
      // Si le pseudo est différent de l'actuel, vérifier son existence
      if (pseudo !== currentUser.pseudo) {
        const existingUser = await UserService.getUserByPseudo(pseudo);
        if (existingUser) return res.status(400).json({ message: "Ce pseudo est déjà utilisé" });
        updatedFields.pseudo = pseudo; // Mettre à jour le pseudo
        hasChanges = true; // Indiquer qu'il y a eu un changement
      }
    }

    // Vérifier et mettre à jour d'autres champs (firstname, lastname, email, etc.)
    if (firstname && firstname !== currentUser.firstname) {
      updatedFields.firstname = firstname;
      hasChanges = true; // Indiquer qu'il y a eu un changement
    }
    if (lastname && lastname !== currentUser.lastname) {
      updatedFields.lastname = lastname;
      hasChanges = true; // Indiquer qu'il y a eu un changement
    }
    if (email && email !== currentUser.email) {
      updatedFields.email = email;
      hasChanges = true; // Indiquer qu'il y a eu un changement
    }

    // Si aucune valeur n'a changé, renvoyer un tableau vide
    if (!hasChanges) {
      return res.status(200).json([]); // Renvoyer un tableau vide
    }

    // Mettre à jour l'utilisateur
    await UserService.updateUser(userId, updatedFields);

    // Récupérer les badges de l'utilisateur après la mise à jour
    const badges = await BadgeService.getBadgesUser(userId);

    // Récupérer l'utilisateur mis à jour
    const updatedUser = await UserService.getUserById(userId);

    // Formater la réponse
    const responseUser = {
      id: updatedUser.id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      pseudo: updatedUser.pseudo,
      email: updatedUser.email,
      coins: updatedUser.coins,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
      badges // Ajouter les badges directement dans l'objet user
    };

    // Renvoyer les informations de l'utilisateur mis à jour
    return res.status(200).json({ message: "Utilisateur mis à jour avec succès", user: responseUser });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    return res.status(500).json({ message: "Erreur serveur lors de la mise à jour de l'utilisateur", error: error.message });
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
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(400).json({ message: "Token manquant" });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ message: "Token invalide ou expiré" });

    const userId = decoded.userId;

    // Récupérer l'utilisateur avec ses badges
    const user = await User.findOne({
      where: { id: userId },
      include: [{
        model: UserBadge,
        include: [BadgeModel]
      }]
    });

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const badges = user.usersBadges.map(userBadge => userBadge.badge);

    const userResponse = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      pseudo: user.pseudo,
      email: user.email,
      coins: user.coins,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      badges
    };

    return res.status(200).json({ 
      token,
      user: userResponse
    });
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
