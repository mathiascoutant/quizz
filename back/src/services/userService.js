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

  updateUser: async (id, updatedData) => {
    console.log('Tentative de mise à jour de l\'utilisateur avec ID:', id);
    const updatedUser = await UserRepository.updateUser(id, updatedData);
    
    if (!updatedUser) {
      throw new Error("Utilisateur non trouvé après la mise à jour");
    }
    
    console.log('Utilisateur mis à jour:', updatedUser);
    return updatedUser;
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
      limit: 3,
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
