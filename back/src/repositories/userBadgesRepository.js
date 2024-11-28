import UserBadge from '../models/userBadgeModel.js';
import BadgeModel from '../models/badgeModel.js'; 

export const UserBadgeRepository = {
  async findByUserId(userId) {
    return UserBadge.findAll({
      where: { userId },
      include: [{ model: BadgeModel, as: 'badge' }]
    });
  },

  async createUserBadge(userId, badgeId) {
    return UserBadge.create({ userId, badgeId });
  },

  async hasBadge(userId, badgeId) {
    return UserBadge.findOne({ where: { userId, badgeId } });
  }
};