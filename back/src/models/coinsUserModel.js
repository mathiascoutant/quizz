import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const UserCoins = sequelize.define('Users', {
  coins: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

UserCoins.findById = async function(id) {
  return await this.findOne({
    where: { id: id }
  });
};

export { UserCoins };
