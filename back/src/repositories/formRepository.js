import Form from '../models/formModel.js';
import Coin from '../models/coinModel.js';
import Category from '../models/categoryModel.js';
import Language from '../models/languageModel.js';
import UserAnswer from '../models/userAnswerModel.js';

export const FormRepository = {
  // CRUD form
  createForm: async (data) => await Form.create(data),
  findAllForms: async () => await Form.findAll({ include: [{ model: Coin, as: 'difficulty' }, { model: Category, as: 'category' }, { model: Language, as: 'language' }] }),
  findFormById: async (id) => await Form.findByPk(id, { include: [{ model: Coin, as: 'difficulty' }, { model: Category, as: 'category' }, { model: Language, as: 'language' }] }),
  updateForm: async (form, data) => await form.update(data),
  deleteForm: async (form) => await form.destroy(),

  // specific operations
  findCoinByDifficulty: async (difficulty) => await Coin.findOne({ where: { difficulty } }),
  findCategoryByName: async (name) => await Category.findOne({ where: { name } }),
  findLanguageByName: async (name) => await Language.findOne({ where: { name } }),
  findUserAnswersByUserId: async (userId) => await UserAnswer.findAll({ where: { userId }, attributes: ['formId'] }),
  findQuizzesByDifficultyAndCategory: async (difficultyId, categoryId, numberOfAnswers) => await Form.findAll({
    where: { difficultyId, categoryId, numberOfAnswers },
    include: [{ model: Coin, as: 'difficulty' }, { model: Category, as: 'category' }, { model: Language, as: 'language' }]
  })
};
