import express from 'express';
import { createForm, getForms, getFormById, updateForm, deleteForm,getRandomQuizByDifficultyAndCategory } from '../controllers/formController.js';

const router = express.Router();

router.post('/create', createForm);           
router.get('/', getForms);              
router.get('/:id', getFormById);       
router.put('/update/:id', updateForm);        
router.delete('/delete/:id', deleteForm);    
router.get('/:userId/:difficultyId/:categoryId/:numberOfAnswers', getRandomQuizByDifficultyAndCategory);


export default router;