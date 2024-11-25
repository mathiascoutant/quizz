import Category from '../models/categoryModel.js';
import Form from '../models/formModel.js';
import UserAnswer from '../models/userAnswerModel.js';

export const CategoryRepository = {
  createCategory: async (data) => {
    return await Category.create(data);
  },

  findAllCategories: async () => {
    return await Category.findAll();
  },

  findCategoryById: async (id) => {
    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
        console.log('Invalid category ID:', id);
        return null; // Retourner null si l'ID n'est pas valide
    }

    console.log('Trying to find category with ID:', categoryId);

    const category = await Category.findByPk(categoryId);

    if (!category) {
        console.log('Category not found for ID:', categoryId);
    }

    return category;
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
  },

  findCategoriesWithPercentage: async (userId) => {
    const categories = await Category.findAll({
      attributes: ['id', 'name'],
      include: [{
        model: Form,
        as: 'forms',
        attributes: ['id'],
        include: [{
          model: UserAnswer,
          as: 'userAnswers',
          where: { userId: userId },
          required: false
        }]
      }]
    });

    return categories.map(category => {
      const totalQuestionsInCategory = category.forms.length;
      const answeredQuestions = category.forms.filter(form => 
        form.userAnswers && form.userAnswers.length > 0
      ).length;

      const percentage = totalQuestionsInCategory > 0 
        ? Number(((answeredQuestions / totalQuestionsInCategory) * 100).toFixed(1))
        : 0;

      return {
        id: category.id,
        name: category.name,
        totalQuestions: totalQuestionsInCategory,
        answeredQuestions: answeredQuestions,
        percentage: percentage
      };
    });
  },
};
