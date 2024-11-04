// categoryRoutes.js
import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/create', createCategory);          
router.get('/', getCategories);            
router.get('/:id', getCategoryById);      
router.put('/update/:id', updateCategory);       
router.delete('/delete/:id', deleteCategory);    

export default router;