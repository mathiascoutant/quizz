import { User } from '../models/userModel.js';
import { UserCoins } from '../models/coinsUserModel.js';

export const UserRepository = {
  findById: async (id) => await User.findById(id).select('-password'),
  saveUser: async (userData) => {
    const user = new User(userData);
    return await user.save();
  },
  updateUser: async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
  },
  deleteUser: async (id) => await User.findByIdAndDelete(id),
  findUserCoinsById: async (id) => await UserCoins.findById(id),
  updateCoins: async (id, coinValue) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found.');
    const newCoinBalance = user.coins + coinValue;
    console.log('newCoinBalance', newCoinBalance);
    await User.update({ coins: newCoinBalance }, { where: { id } });

    return newCoinBalance; 
  }
};
