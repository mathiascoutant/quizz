import { UserAnswerRepository } from '../repositories/userAnswerRepository.js';
import { CategoryRepository } from '../repositories/categoryRepository.js';

export const UserAnswerService = {
  async createUserAnswer({ formId, userId, userAnswer }) {
    const form = await UserAnswerRepository.findFormById(formId);
    if (!form) throw new Error('Form not found.');

    const isCorrect = userAnswer === form.correctAnswer;
    let coinValue = 0;

    if (isCorrect) {
      const coin = await UserAnswerRepository.findCoinByDifficultyId(form.difficultyId);
      if (coin) coinValue = coin.coinValue;
    }

    return await UserAnswerRepository.createUserAnswer({ formId, userId, userAnswer, isCorrect, coinValue });
  },

  async getAllUserAnswers() {
    return await UserAnswerRepository.findAllUserAnswers();
  },

  async getUserAnswerById(id) {
    return await UserAnswerRepository.findUserAnswerById(id);
  },

  async deleteUserAnswerById(id) {
    return await UserAnswerRepository.deleteUserAnswerById(id);
  },

  async getUserAnswersByUserId(userId) {
    return await UserAnswerRepository.findUserAnswersByUserId(userId);
  },

  async getUserAnswerStats(userId) {
    const stats = await UserAnswerRepository.getUserAnswerStats(userId);
    if (stats[0].totalAnswers === 0) throw new Error('No answers found for this user.');

    const { totalAnswers, correctAnswers, incorrectAnswers } = stats[0];
    return {
      totalAnswers,
      correctPercentage: ((correctAnswers / totalAnswers) * 100).toFixed(2) + '%',
      incorrectPercentage: ((incorrectAnswers / totalAnswers) * 100).toFixed(2) + '%'
    };
  },

  async getUserAnswerStatsByCategory(userId) {
    const answersByCategory = await UserAnswerRepository.getUserAnswerStatsByCategory(userId);
    if (answersByCategory.length === 0) throw new Error('No answers found for this user.');

    return await Promise.all(
      answersByCategory.map(async (category) => {
        const { categoryId, totalAnswers, correctAnswers, incorrectAnswers } = category;
        const correctPercentage = ((correctAnswers / totalAnswers) * 100).toFixed(2);
        const incorrectPercentage = ((incorrectAnswers / totalAnswers) * 100).toFixed(2);
        const categoryName = await CategoryRepository.findCategoryNameById(categoryId);

        return {
          categoryId,
          categoryName,
          totalAnswers,
          correctAnswers,
          incorrectAnswers,
          correctPercentage: `${correctPercentage}%`,
          incorrectPercentage: `${incorrectPercentage}%`
        };
      })
    );
  }
};
