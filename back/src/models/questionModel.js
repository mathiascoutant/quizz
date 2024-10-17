import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Category } from './categoryModel.js';
import { Coins } from './coinsModel.js';

const Form = sequelize.define('Form', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correctAnswer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 4
    }
  },
  possibleAnswers: {
    type: DataTypes.JSON,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  },
  difficultyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Coins,
      key: 'id'
    }
  }
});

Form.belongsTo(Category, { foreignKey: 'categoryId' });
Form.belongsTo(Coins, { foreignKey: 'difficultyId' });

export { Form };
