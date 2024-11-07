import CoinModel from '../models/coinModel.js';

export const CoinRepository = {
  findAllDifficulties: async () => {
    return await CoinModel.findAll({
      attributes: ['id', 'difficulty']
    });
  }
};
