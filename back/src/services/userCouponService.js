import { UserCouponRepository } from '../repositories/userCouponRepository.js';
import { User } from '../models/userModel.js';
import Coupon from '../models/couponModel.js';

export const userCouponService = {
  createUserCoupon: async (data) => {
    const { userId, couponId } = data;

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Utilisateur non trouvé.");
    }

    const coupon = await Coupon.findByPk(couponId);
    if (!coupon) {
      throw new Error("Coupon non trouvé.");
    }

    return await UserCouponRepository.create(data);
  },

  getAllUserCoupons: async () => {
    return await UserCouponRepository.findAll();
  },

  getUserCouponById: async (userId, couponId) => {
    const userCoupon = await UserCouponRepository.findByUserIdAndCouponId(userId, couponId);
    if (!userCoupon) {
      throw new Error("UserCoupon non trouvé.");
    }
    return userCoupon;
  },

  getUserCouponsByUserId: async (userId) => {
    const userCoupons = await UserCouponRepository.findAllByUserId(userId);
    if (userCoupons.length === 0) {
      throw new Error("Aucun UserCoupon trouvé pour cet utilisateur.");
    }
    return userCoupons;
  },

  updateUserCoupon: async (userId, couponId, discountCode) => {
    const userCouponToUpdate = await UserCouponRepository.findByUserIdAndCouponId(userId, couponId);
    if (!userCouponToUpdate) {
      throw new Error("UserCoupon non trouvé.");
    }

    userCouponToUpdate.discountCode = discountCode;
    return await UserCouponRepository.update(userCouponToUpdate);
  },

  deleteUserCoupon: async (userId, couponId) => {
    const userCouponToDelete = await UserCouponRepository.findByUserIdAndCouponId(userId, couponId);
    if (!userCouponToDelete) {
      throw new Error("UserCoupon non trouvé.");
    }
    
    return await UserCouponRepository.delete(userCouponToDelete);
  }
};
