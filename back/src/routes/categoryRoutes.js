// categoryRoutes.js
import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getPercentageForCategories
} from '../controllers/categoryController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

router.post('/create', createCategory);          
router.get('/', getCategories);    
router.get('/percentage', protect,getPercentageForCategories);        
router.get('/:id', getCategoryById);      
router.put('/update/:id', updateCategory);       
router.delete('/delete/:id', deleteCategory);

export default router;