import express from 'express';
import {
    getLevels
} from '../controllers/coinController.js';

const router = express.Router();

router.get('/', getLevels);

export default router;
