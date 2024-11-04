import express from 'express';
import {
    getLevels
} from '../controllers/listDifficulty.js';

const router = express.Router();

router.get('/list', getLevels);

export default router;
