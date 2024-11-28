import { User } from '../models/userModel.js';
import { UserCoins } from '../models/coinsUserModel.js';

export const UserRepository = {
  findBy: async (id) => await User.findById(id).select('-password'),
  saveUser: async (userData) => {
    const user = new User(userData);
    return await user.save();
  },
  async updateUser(userId, updatedData) {
    try {
      console.log('Mise à jour des données de l\'utilisateur avec ID:', userId, 'Données:', updatedData);
      const [updatedRowsCount] = await User.update(updatedData, {
        where: { id: userId },
      });

      console.log('Nombre de lignes mises à jour:', updatedRowsCount);

      if (updatedRowsCount === 0) {
        throw new Error("Aucun utilisateur trouvé pour mettre à jour");
      }

      const updatedUser = await User.findByPk(userId);
      console.log('Utilisateur après mise à jour:', updatedUser);

      if (!updatedUser) {
        throw new Error("Utilisateur non trouvé après la mise à jour");
      }

      return updatedUser;
    } catch (error) {
      console.error('Erreur dans la mise à jour de l\'utilisateur :', error);
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
    }
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
