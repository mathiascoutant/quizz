import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Coupon = sequelize.define('Coupon', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cashReduction: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    percentReduction: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    nameNominator: {
        type: DataTypes.STRING(55),
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(55),
        allowNull: true
    },
    specificContent: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    coinCost: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    validityDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'Coupons',
    timestamps: false
});

export default Coupon;