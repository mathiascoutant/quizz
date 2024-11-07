import express from 'express';
import {
    getBadgesUser,
    getAllBadges
} from '../controllers/badgeController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

router.get('/', protect, getBadgesUser);
router.get('/all', getAllBadges);

export default router;