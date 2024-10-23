import express from 'express';
import {
  createUserCoupon,
  getAllUserCoupons,
  getUserCouponById,
  getUserCouponsByUserId,
  updateUserCoupon,
  deleteUserCoupon
  
} from '../controllers/userCouponController.js';

const router = express.Router();


router.post('/', createUserCoupon);
router.get('/', getAllUserCoupons);
router.get('/:userId/:couponId', getUserCouponById);
router.get('/user/:userId', getUserCouponsByUserId);
router.put('/:userId/:couponId', updateUserCoupon);
router.delete('/:userId/:couponId', deleteUserCoupon);

export default router;
