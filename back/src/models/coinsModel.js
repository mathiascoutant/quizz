import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
 
// Définition du modèle Coin avec Sequelize
const Coins = sequelize.define('Coins', {
  coinValue: {
    type: DataTypes.INTEGER,   
    allowNull: false,          
    validate: {
      min: 0                   
    }
  },
  difficulty: {
    type: DataTypes.ENUM('débutant', 'confirmé', 'expert'),
    allowNull: false           
  }
}, {
  timestamps: false           
});
 
export { Coins };
