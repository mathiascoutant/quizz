import { UserRepository } from '../repositories/userRepository.js';
import { hashPassword } from '../utils/passwordUtils.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "votre_clé_secrète_ici";

export const UserService = {
  getUserById: async (id) => await UserRepository.findById(id),
  
  createUser: async ({ pseudo, email, password }) => {
    const hashedPassword = await hashPassword(password);
    return await UserRepository.saveUser({ pseudo, email, password: hashedPassword });
  },

  updateUser: async (id, updateData) => await UserRepository.updateUser(id, updateData),
  
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
  }
};
