import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Coupon from './couponModel.js'; 
import { User }  from './userModel.js';  

const UserCoupon = sequelize.define('UserCoupon', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',  // Référence à la table Users
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    couponId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Coupons',  // Référence à la table Coupons
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    discountCode: {
        type: DataTypes.STRING(30),
        allowNull: true
    }
}, {
    tableName: 'UserCoupons',
    timestamps: false
});


User.belongsToMany(Coupon, { through: UserCoupon, as: 'coupons', foreignKey: 'userId' });
Coupon.belongsToMany(User, { through: UserCoupon, as: 'users', foreignKey: 'couponId' });

export default UserCoupon;
