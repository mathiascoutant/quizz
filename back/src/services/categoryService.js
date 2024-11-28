import { CategoryRepository } from '../repositories/categoryRepository.js';

export const CategoryService = {
  createCategory: async (data) => {
    return await CategoryRepository.createCategory(data);
  },

  getAllCategories: async () => {
    return await CategoryRepository.findAllCategories();
  },

  getCategoryById: async (id) => {
    return await CategoryRepository.findCategoryById(id);
  },

  updateCategory: async (id, data) => {
    const category = await CategoryRepository.findCategoryById(id);
    if (!category) return null;
    return await CategoryRepository.updateCategory(category, data);
  },

  deleteCategory: async (id) => {
    const category = await CategoryRepository.findCategoryById(id);
    if (!category) return null;
    await CategoryRepository.deleteCategory(category);
    return true;
  },

  getPercentageForCategories: async (userId) => {
    return await CategoryRepository.findCategoriesWithPercentage(userId);
  }
};
