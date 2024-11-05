import Coupon from '../models/couponModel.js';
import { User } from '../models/userModel.js';
import UserCoupon from '../models/userCouponModel.js';

export const CouponRepository = {
  // CRUD Coupons
  createCoupon: async (data) => await Coupon.create(data),
  findAllCoupons: async () => await Coupon.findAll(),
  findCouponById: async (id) => await Coupon.findByPk(id),
  updateCoupon: async (coupon, data) => await coupon.update(data),
  deleteCoupon: async (coupon) => await coupon.destroy(),

  // spécific operations
  findCouponsByBrand: async (brand) => await Coupon.findAll({ where: { brand } }),
  findUserById: async (userId) => await User.findByPk(userId),
  createUserCoupon: async (userCouponData) => await UserCoupon.create(userCouponData)
};
