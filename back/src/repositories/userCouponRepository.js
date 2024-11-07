import UserCoupon from '../models/userCouponModel.js';
import { User } from '../models/userModel.js';
import Coupon from '../models/couponModel.js';

export const UserCouponRepository = {
  create: async (data) => {
    return await UserCoupon.create(data);
  },

  findAll: async () => {
    return await UserCoupon.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Coupon, as: 'coupon' }
      ]
    });
  },

  findByUserIdAndCouponId: async (userId, couponId) => {
    return await UserCoupon.findOne({
      where: { userId, couponId },
      include: [
        { model: User, as: 'user' },
        { model: Coupon, as: 'coupon' }
      ]
    });
  },

  findAllByUserId: async (userId) => {
    return await UserCoupon.findAll({
      where: { userId },
      include: [{ model: Coupon, as: 'coupon' }]
    });
  },

  update: async (userCoupon) => {
    return await userCoupon.save();
  },

  delete: async (userCoupon) => {
    return await userCoupon.destroy();
  }
};
