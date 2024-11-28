import { UserRepository } from '../repositories/userRepository.js';
import { hashPassword } from '../utils/passwordUtils.js';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

const JWT_SECRET = "votre_clé_secrète_ici";

export const UserService = {
  getUserById: async (id) => await User.findByPk(id),
  
  createUser: async ({ pseudo, email, password }) => {
    const hashedPassword = await hashPassword(password);
    return await UserRepository.saveUser({ pseudo, email, password: hashedPassword });
  },

  updateUser: async (userId, updatedData) => {
    try {
      // Récupérer l'utilisateur actuel
      const currentUser = await User.findById(userId);
      if (!currentUser) {
        throw new Error("Utilisateur non trouvé.");
      }

      // Vérifier si le pseudo a changé
      if (updatedData.pseudo) {
        // Comparer le pseudo actuel avec le pseudo envoyé par le front
        if (updatedData.pseudo !== currentUser.pseudo) {
          // Vérifier si le nouveau pseudo existe déjà, en excluant l'utilisateur actuel
          const existingUser = await User.findOne({ 
            where: { 
              pseudo: updatedData.pseudo,
              id: { [Op.ne]: userId } // Exclure l'utilisateur actuel
            } 
          });
          if (existingUser) {
            throw new Error("Ce pseudo est déjà utilisé.");
          }
        }
      }

      // Mettre à jour l'utilisateur
      const updatedUser = await User.update(updatedData, { where: { id: userId } });
      return updatedUser;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
    }
  },


  deleteUser: async (id) => await UserRepository.deleteUser(id),
  
  getUserProfile: async (token) => {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id || decodedToken.userId;
    return await UserRepository.findById(userId);
  },

  getUserCoins: async (token) => {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id || decodedToken.userId;
    const userCoins = await UserRepository.findUserCoinsById(userId);
    return userCoins ? userCoins.coins : null;
  },


  getUserByPseudo: async (pseudo) => {
    return await User.findOne({
      where: { pseudo: pseudo }, 
    });
  },
  
  getTopUsersByCoins: async (limit = 3) => {
    return await User.findAll({
      order: [['coins', 'DESC']], // Assurez-vous que 'coins' est un champ dans votre modèle User
      limit: limit,
    });
  },

  getUserPositionByCoins: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const totalUsers = await User.count({
      where: {
        coins: {
          [Op.gt]: user.coins, // Compte les utilisateurs avec plus de coins
        },
      },
    });

    return totalUsers + 1; // La position est le nombre d'utilisateurs avec plus de coins + 1
  },

  getTopUsersWithPosition: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Récupérer le top 3 des utilisateurs avec le plus de coins
    const topUsers = await User.findAll({
      order: [['coins', 'DESC']],
      limit: 10,
      attributes: ['id', 'pseudo', 'coins'], // Utilisez 'pseudo' au lieu de 'firstname' et 'lastname'
    });

    // Calculer la position de l'utilisateur actuel
    const totalUsers = await User.count({
      where: {
        coins: {
          [Op.gt]: user.coins, // Compte les utilisateurs avec plus de coins
        },
      },
    });

    const position = totalUsers + 1; // La position est le nombre d'utilisateurs avec plus de coins + 1

    // Inclure l'utilisateur actuel dans la réponse
    return {
      topUsers,
      currentUser: {
        id: user.id,
        pseudo: user.pseudo, // Inclure le pseudo
        coins: user.coins,
        position,
      },
    };
  },
};
