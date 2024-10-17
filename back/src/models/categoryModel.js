import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Le nom de la catégorie est requis' }
    }
  }
}, {
  tableName: 'Category',
  timestamps: true // Gardez ceci si vous voulez les champs createdAt et updatedAt
});

export { Category };