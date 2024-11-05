import { CoinService } from '../services/coinService.js';

export const getLevels = async (req, res) => {
  try {
    const difficulties = await CoinService.getLevels();
    res.status(200).json(difficulties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
