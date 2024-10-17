import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Question = sequelize.define('Form', {
  theme: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  choice1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  choice2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  choice3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  choice4: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  correctAnswer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 4
    }
  }
});

export { Question };
