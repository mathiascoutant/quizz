import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
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
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Méthode pour comparer les mots de passe
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export { User };
