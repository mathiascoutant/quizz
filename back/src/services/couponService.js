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

  payCoupon: async (userId, coupons) => {
    const user = await CouponRepository.findUserById(userId);

    if (!user) {
      return { error: `Utilisateur non trouvé pour l'ID: ${userId}.` };
    }

    // Calculer le coût total des coupons
    let totalCost = 0;
    const couponDetails = [];

    for (const { couponId, quantity } of coupons) {
      const coupon = await CouponRepository.findCouponById(couponId);
      if (!coupon) {
        return { error: `Coupon non trouvé pour l'ID: ${couponId}.` };
      }
      totalCost += coupon.coinCost * quantity; // Ajouter le coût du coupon à la somme totale
      couponDetails.push({ coupon, quantity });
    }

    // Vérifier si l'utilisateur a suffisamment de coins pour le coût total
    if (user.coins < totalCost) {
      return { error: `Fonds insuffisants. Vous avez ${user.coins} coins, mais le coût total est de ${totalCost} coins.` };
    }

    // Appliquer les coupons
    for (const { coupon, quantity } of couponDetails) {
      const discountCode = `${coupon.brand}_${coupon.id}`;
      for (let i = 0; i < quantity; i++) {
        await CouponRepository.createUserCoupon({ userId, couponId: coupon.id, discountCode });
      }
    }

    // Mettre à jour le solde de l'utilisateur
    await user.update({ coins: user.coins - totalCost });

    return { success: true };
  }
};
