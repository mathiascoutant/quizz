import { FormRepository } from '../repositories/formRepository.js';

export const FormService = {
  // basic crud services
  createForm: async ({ language, category, theme, difficulty, content, correctAnswer, possibleAnswers }) => {
    const coin = await FormRepository.findCoinByDifficulty(difficulty);
    if (!coin) throw new Error('Valeur de difficulté invalide.');

    const cat = await FormRepository.findCategoryByName(category);
    if (!cat) throw new Error('Catégorie invalide.');

    const lang = await FormRepository.findLanguageByName(language);
    if (!lang) throw new Error('Langue invalide.');

    return await FormRepository.createForm({
      languageId: lang.id,
      categoryId: cat.id,
      theme,
      content,
      difficultyId: coin.id,
      correctAnswer,
      possibleAnswers,
      numberOfAnswers: possibleAnswers.length
    });
  },

  getAllForms: async () => await FormRepository.findAllForms(),
  getFormById: async (id) => await FormRepository.findFormById(id),
  updateForm: async (id, { language, category, theme, difficulty, content, correctAnswer, possibleAnswers }) => {
    const form = await FormRepository.findFormById(id);
    if (!form) return null;

    const coin = await FormRepository.findCoinByDifficulty(difficulty);
    const cat = await FormRepository.findCategoryByName(category);
    const lang = await FormRepository.findLanguageByName(language);

    if (!coin || !cat || !lang) throw new Error('Invalid data for updating form.');

    return await FormRepository.updateForm(form, {
      languageId: lang.id,
      categoryId: cat.id,
      theme,
      difficultyId: coin.id,
      content,
      correctAnswer,
      possibleAnswers,
      numberOfAnswers: possibleAnswers.length
    });
  },

  deleteForm: async (id) => {
    const form = await FormRepository.findFormById(id);
    if (!form) return null;
    await FormRepository.deleteForm(form);
    return true;
  },

  // specific operations
  getRandomQuizByDifficultyAndCategory: async (userId, difficultyId, categoryId, numberOfAnswers) => {
    const quizzes = await FormRepository.findQuizzesByDifficultyAndCategory(difficultyId, categoryId, numberOfAnswers);
    const answeredQuizzes = await FormRepository.findUserAnswersByUserId(userId);
    const answeredQuizIds = answeredQuizzes.map(answer => answer.formId);
    const availableQuizzes = quizzes.filter(quiz => !answeredQuizIds.includes(quiz.id));
    if (availableQuizzes.length === 0) return null;

    return availableQuizzes[Math.floor(Math.random() * availableQuizzes.length)];
  }
};
