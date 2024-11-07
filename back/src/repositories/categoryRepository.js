import Category from '../models/categoryModel.js';

export const CategoryRepository = {
  createCategory: async (data) => {
    return await Category.create(data);
  },

  findAllCategories: async () => {
    return await Category.findAll();
  },

  findCategoryById: async (id) => {
    return await Category.findByPk(id);
  },

  updateCategory: async (category, data) => {
    category.name = data.name;
    category.shortDescription = data.shortDescription;
    category.longDescription = data.longDescription;
    return await category.save();
  },

  deleteCategory: async (category) => {
    await category.destroy();
  },

  findCategoryNameById: async (categoryId) => {
    const category = await Category.findOne({
      where: { id: categoryId },
      attributes: ['name']
    });
    return category ? category.name : null;
  }
};
