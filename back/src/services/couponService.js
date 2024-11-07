import { CouponRepository } from '../repositories/couponRepository.js';

export const CouponService = {
  // CRUD de base pour les coupons
  createCoupon: async (data) => await CouponRepository.createCoupon(data),
  getAllCoupons: async () => await CouponRepository.findAllCoupons(),
  getCouponById: async (id) => await CouponRepository.findCouponById(id),

  updateCoupon: async (id, data) => {
    const coupon = await CouponRepository.findCouponById(id);
    if (!coupon) return null;
    return await CouponRepository.updateCoupon(coupon, data);
  },

  deleteCoupon: async (id) => {
    const coupon = await CouponRepository.findCouponById(id);
    if (!coupon) return null;
    await CouponRepository.deleteCoupon(coupon);
    return true;
  },

  // Opérations spécifiques
  getCouponsByBrand: async (brand) => await CouponRepository.findCouponsByBrand(brand),

  payCoupon: async (userId, couponId) => {
    const coupon = await CouponRepository.findCouponById(couponId);
    const user = await CouponRepository.findUserById(userId);

    if (!coupon || !user) return { error: 'Coupon ou utilisateur non trouvé' };
    if (user.coins < coupon.coinCost) return { error: 'Solde insuffisant' };

    const discountCode = `${coupon.brand}_${coupon.id}`;
    const newCoinBalance = user.coins - coupon.coinCost;

    await CouponRepository.createUserCoupon({ userId, couponId, discountCode });
    await user.update({ coins: newCoinBalance });

    return { success: true };
  }
};
