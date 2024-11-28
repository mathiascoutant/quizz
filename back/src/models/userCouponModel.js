import { DataTypes } from 'sequelize';
import { sequelize }from '../config/database.js'
import { User } from './userModel.js';
import Coupon from './couponModel.js';

const UserCoupons = sequelize.define('UserCoupons', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nom de la table référencée
      key: 'id',      // Clé de référence
    },
  },
  couponId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Coupons', // Nom de la table référencée
      key: 'id',        // Clé de référence
    },
  },
  discountCode: {
    type: DataTypes.STRING(30),
    allowNull: true,
    defaultValue: null,
  },
}, {
  tableName: 'UserCoupons',
  timestamps: false, // Si vous n'utilisez pas les colonnes createdAt et updatedAt
});

UserCoupons.belongsTo(User, { foreignKey: 'userId' });
UserCoupons.belongsTo(Coupon, { foreignKey: 'couponId', as: 'coupon' });

// Export par défaut
export default UserCoupons; // Utilisez export default ici pour une exportation par défaut
