import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const User = sequelize.define('Users', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: { msg: 'Le prénom est requis' }
    }
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: { msg: 'Le nom de famille est requis' }
    }
  },
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Le nom d\'utilisateur est requis' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'L\'adresse email n\'est pas valide' },
      notEmpty: { msg: 'L\'adresse email est requise' }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 100],
        msg: 'Le mot de passe doit contenir au moins 6 caractères'
      }
    }
  },
  coins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
});

// Ajoutez cette méthode statique au modèle User
User.findByEmail = async function(email) {
  return await this.findOne({
    where: { email: email }
  });
};

User.findById = async function(userid) {
  return await this.findOne({
    where: { id: userid }
  });
};

export { User };
