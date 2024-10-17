import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';


const Coin = sequelize.define('Coin', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
},
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


export default Coin;

