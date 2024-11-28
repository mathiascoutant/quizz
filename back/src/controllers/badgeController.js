import { BadgeService } from '../services/badgeService.js';

export const getBadgesUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const badges = await BadgeService.getBadgesUser(userId);
    res.status(200).json(badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBadges = async (req, res) => {
  try {
    const badges = await BadgeService.getAllBadges();
    res.status(200).json(badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
