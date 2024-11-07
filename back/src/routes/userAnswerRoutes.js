import express from 'express';
import {
  createUserAnswer,
  getAllUserAnswers,
  getUserAnswersByUserId,
  getUserAnswerById,
  deleteUserAnswer,
  getUserAnswersStats,
  getUserAnswersStatsByCategory
  
} from '../controllers/userAnswerController.js';
import { get } from 'mongoose';

const router = express.Router();

router.post('/', createUserAnswer);
router.get('/', getAllUserAnswers);
router.get('/:id', getUserAnswerById);
router.get('/user/:userId', getUserAnswersByUserId);
router.delete('/delete/:id', deleteUserAnswer);
router.get('/stats/:userId', getUserAnswersStats);
router.get('/statsByCategory/:userId',getUserAnswersStatsByCategory);

export default router;
