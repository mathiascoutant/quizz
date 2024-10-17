import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Levels = sequelize.define('Coins', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Le nom du niveau est requis' }
    }
  }
}, {
  tableName: 'Coins',
  timestamps: true // Gardez ceci si vous voulez les champs createdAt et updatedAt
});

export { Levels };