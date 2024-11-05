import express from 'express';
import {
    getLevels
} from '../controllers/listDifficultyController.js';

const router = express.Router();

router.get('/', getLevels);

export default router;
