import { BadgeRepository } from '../repositories/badgeRepository.js';

export const BadgeService = {
  getBadgesUser: async (userId) => {
    return await BadgeRepository.findAllBadgesUser(userId);
  },
  
  getAllBadges: async () => {
    return await BadgeRepository.findAll();
  }
};
