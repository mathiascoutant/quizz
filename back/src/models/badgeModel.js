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
}, {
  tableName: 'badges', // Nom de la table dans la base de données
});

export default BadgeModel;
