import express from 'express';
import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  getCouponsByBrand 
} from '../controllers/couponController.js';

const router = express.Router();

router.post('/create', createCoupon);
router.get('/', getAllCoupons);
router.get('/:id', getCouponById);
router.get('/brand/:brand', getCouponsByBrand );
router.put('/update/:id', updateCoupon);
router.delete('/delete/:id', deleteCoupon);

export default router;