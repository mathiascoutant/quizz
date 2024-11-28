import { UserAnswerRepository } from '../repositories/userAnswerRepository.js';
import { CategoryRepository } from '../repositories/categoryRepository.js';
import { UserRepository } from '../repositories/userRepository.js';

export const UserAnswerService = {
  async createUserAnswer({ formId, userId, userAnswer }) {
    const form = await UserAnswerRepository.findFormById(formId);
    if (!form) throw new Error('Form not found.');
  
    const isCorrect = userAnswer === form.correctAnswer;
    let coinValue = 0;
    const coin = await UserAnswerRepository.findCoinByDifficultyId(form.difficultyId);
    
    let message = ''; 
    if (isCorrect) {
      if (coin) coinValue = coin.coinValue;
      message = "You are a winner, Babe 🦄 !"; 
    } else {
      if (coin) coinValue = coin.coinValue * -1;
      message = "You are a fucking loser 🦄 !";
    }
  
    const userAnswerData = await UserAnswerRepository.createUserAnswer({ formId, userId, userAnswer, isCorrect, coinValue });
    const newCoinBalance = await UserRepository.updateCoins(userId, coinValue);
  
    return {
      userAnswerData,
      newCoinBalance,
      message 
    };
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