import { CategoryService } from '../services/categoryService.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};


// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve category' });
  }
};

// Get only the name of a category by ID
export const getCategoryNameById = async (req, res) => {
  try {
    const categoryName = await CategoryService.getCategoryNameById(req.params.id);
    if (!categoryName) {
      return res.status(404).json({ error: 'Category name not found' });
    }
    res.status(200).json({ name: categoryName });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve category name' });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await CategoryService.updateCategory(req.params.id, req.body);
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await CategoryService.deleteCategory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

// Get percentage of responses for each category
export const getPercentageForCategories = async (req, res) => {
  try {
    const requestedUserId = req.params.userid;
    const authenticatedUserId = req.user.id; // L'ID de l'utilisateur du token JWT

    // Vérification que l'utilisateur demande ses propres données
    if (parseInt(requestedUserId) !== authenticatedUserId) {
      return res.status(403).json({ 
        error: 'Accès non autorisé. Vous ne pouvez consulter que vos propres statistiques.' 
      });
    }

    if (!requestedUserId) {
      return res.status(400).json({ error: 'ID utilisateur manquant' });
    }

    const categoriesData = await CategoryService.getPercentageForCategories(requestedUserId);
    
    if (!categoriesData.length) {
      return res.status(404).json({ error: 'Aucune catégorie trouvée' });
    }

    res.status(200).json(categoriesData);
  } catch (error) {
    console.error('Error in getPercentageForCategories:', error);
    res.status(500).json({ error: 'Échec du calcul des pourcentages par catégorie' });
  }
};
