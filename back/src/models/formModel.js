import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Coin from './coinModel.js'; 
import Language from './languageModel.js'; 
import Category from './categoryModel.js';

const Form = sequelize.define('Form', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  languageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Language,            
      key: 'id'               
    },
    onDelete: 'RESTRICT',     
    onUpdate: 'CASCADE'      
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,            
      key: 'id'               
    },
    onDelete: 'RESTRICT',     
    onUpdate: 'CASCADE'      
  },
  theme: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  difficultyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Coin,            
      key: 'id'               
    },
    onDelete: 'RESTRICT',     
    onUpdate: 'CASCADE'      
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  possibleAnswers: {
    type: DataTypes.JSON,
    allowNull: false
  },
  correctAnswer: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  numberOfAnswers: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Forms',           
  timestamps: false,            
});

Coin.hasMany(Form, { as: 'forms', foreignKey: 'difficultyId' });
Form.belongsTo(Coin, { as: 'difficulty',foreignKey: 'difficultyId' });
Category.hasMany(Form, { as: 'forms', foreignKey: 'categoryId' });
Form.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });
Language.hasMany(Form, { as: 'forms', foreignKey: 'languageId' });
Form.belongsTo(Language, { as: 'language', foreignKey: 'languageId' });

export default Form ;
