import { CoinRepository } from '../repositories/coinRepository.js';

export const CoinService = {
  getLevels: async () => {
    return await CoinRepository.findAllDifficulties();
  }
};
