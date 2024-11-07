import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; // Assurez-vous d'importer votre instance Sequelize
import BadgeModel from './badgeModel.js'; // Importer BadgeModel après la définition de UserBadge

const UserBadge = sequelize.define('usersBadges', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  badgeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'usersBadges', // Nom de la table dans la base de données
  timestamps: false, // Désactiver les timestamps
});

// Définir les relations
BadgeModel.hasMany(UserBadge, { foreignKey: 'badgeId' });
UserBadge.belongsTo(BadgeModel, { foreignKey: 'badgeId' });

// Exporter le modèle UserBadge
export default UserBadge; 