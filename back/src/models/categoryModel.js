import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },

  shortDescription: { 
    type: DataTypes.STRING(255),
    allowNull: false
  },
  longDescription: {
    type: DataTypes.TEXT,
    allowNull: false
  }
},
{
  tableName: 'Category',           
  timestamps: false,            
});

export default Category;
