import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Language = sequelize.define('Language', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'Language',           
  timestamps: false,            
});

export default Language;
