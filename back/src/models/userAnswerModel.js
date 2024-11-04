import { DataTypes } from 'sequelize';
import { sequelize }from '../config/database.js';
import Form from './formModel.js'; 
import { User }  from './userModel.js';  

const UserAnswer = sequelize.define('UserAnswer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    formId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Forms',  // Référence à la table Forms
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',  // Référence à la table Users
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    userAnswer: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    coinValue: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'UserAnswers',
    timestamps: false
});


Form.hasMany(UserAnswer, { as: 'userAnswers', foreignKey: 'formId' });
UserAnswer.belongsTo(Form, { as: 'form', foreignKey: 'formId' });
User.hasMany(UserAnswer, { as: 'userAnswers', foreignKey: 'userId' });
UserAnswer.belongsTo(User, { as: 'user', foreignKey: 'userId' });

export default UserAnswer;
