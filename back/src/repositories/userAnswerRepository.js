import UserAnswer from '../models/userAnswerModel.js';
import Form from '../models/formModel.js';
import { User } from '../models/userModel.js';
import Coin from '../models/coinModel.js';
import { sequelize } from '../config/database.js';

export const UserAnswerRepository = {
  async findFormById(formId) {
    return await Form.findByPk(formId);
  },

  async findCoinByDifficultyId(difficultyId) {
    return await Coin.findByPk(difficultyId);
  },

  async createUserAnswer(data) {
    return await UserAnswer.create(data);
  },

  async findAllUserAnswers() {
    return await UserAnswer.findAll({
      include: [{ model: Form, as: 'form' }, { model: User, as: 'user' }]
    });
  },

  async findUserAnswerById(id) {
    return await UserAnswer.findByPk(id, {
      include: [{ model: Form, as: 'form' }, { model: User, as: 'user' }]
    });
  },

  async deleteUserAnswerById(id) {
    const userAnswer = await UserAnswer.findByPk(id);
    if (userAnswer) await userAnswer.destroy();
    return userAnswer;
  },

  async findUserAnswersByUserId(userId) {
    return await UserAnswer.findAll({
      where: { userId },
      include: [{ model: Form, as: 'form' }, { model: User, as: 'user' }]
    });
  },

  async getUserAnswerStats(userId) {
    return await UserAnswer.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalAnswers'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN isCorrect = true THEN 1 ELSE 0 END')), 'correctAnswers'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN isCorrect = false THEN 1 ELSE 0 END')), 'incorrectAnswers']
      ],
      where: { userId },
      raw: true
    });
  },

  async getUserAnswerStatsByCategory(userId) {
    return await UserAnswer.findAll({
      attributes: [
        [sequelize.col('form.categoryId'), 'categoryId'],
        [sequelize.fn('COUNT', sequelize.col('UserAnswer.id')), 'totalAnswers'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN UserAnswer.isCorrect = true THEN 1 ELSE 0 END')), 'correctAnswers'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN UserAnswer.isCorrect = false THEN 1 ELSE 0 END')), 'incorrectAnswers']
      ],
      where: { userId },
      include: [{ model: Form, as: 'form', attributes: [] }],
      group: ['form.categoryId'],
      raw: true
    });
  }
};
