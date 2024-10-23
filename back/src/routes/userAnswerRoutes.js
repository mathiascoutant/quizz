import express from 'express';
import {
  createUserAnswer,
  getAllUserAnswers,
  getUserAnswerById,
  deleteUserAnswer,
  getUserAnswersByUserId
} from '../controllers/userAnswerController.js';

const router = express.Router();

router.post('/', createUserAnswer);
router.get('/', getAllUserAnswers);
router.get('/:id', getUserAnswerById);
router.get('/user/:userId', getUserAnswersByUserId);
router.delete('/delete/:id', deleteUserAnswer);

export default router;
