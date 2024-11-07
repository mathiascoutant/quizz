import BadgeModel from '../models/badgeModel.js';
import UserBadge from '../models/userBadgeModel.js';

export const BadgeRepository = {
  findAllBadgesUser: async (userId) => {
    return await BadgeModel.findAll({
      include: [{
        model: UserBadge,
        where: { userId },
        required: true,
      }],
      attributes: ['id', 'name', 'description', 'urlImage'],
    });
  },
  
  findAll: async () => {
    return await BadgeModel.findAll({
      attributes: ['id', 'name', 'description', 'urlImage'],
    });
  }
};
