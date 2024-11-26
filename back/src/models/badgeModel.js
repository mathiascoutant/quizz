import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const BadgeModel = sequelize.define('badges', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conditionValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'badges',
  timestamps: false, // Désactive les champs createdAt et updatedAt
});

export default BadgeModel;
