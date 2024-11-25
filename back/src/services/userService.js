import { updateUser } from '../controllers/userController.js';
import { UserRepository } from '../repositories/userRepository.js';
import { hashPassword } from '../utils/passwordUtils.js';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

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
  
};
