import { UserCouponRepository } from '../repositories/userCouponRepository.js';
import { User } from '../models/userModel.js';
import Coupon from '../models/couponModel.js';
import UserCoupons from '../models/userCouponModel.js';
import { CouponRepository } from '../repositories/couponRepository.js';

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

  // Méthode pour récupérer tous les UserCoupons
  getAllUserCoupons: async () => {
    return await UserCouponRepository.findAll();
  },

  // Méthode pour récupérer un UserCoupon spécifique
  getUserCouponById: async (userId, couponId) => {
    const userCoupon = await UserCouponRepository.findByUserIdAndCouponId(userId, couponId);
    if (!userCoupon) {
      throw new Error("UserCoupon non trouvé.");
    }
    return userCoupon;
  },

  // Méthode pour récupérer tous les UserCoupons d'un utilisateur
  getUserCouponsByUserId: async (userId) => {
    const userCoupons = await UserCouponRepository.findAllByUserId(userId);

    if (userCoupons.length === 0) {
      throw new Error("Aucun UserCoupon trouvé pour cet utilisateur.");
    }
    return userCoupons;
  },

  // Méthode pour mettre à jour un UserCoupon
  updateUserCoupon: async (userId, couponId, discountCode) => {
    const userCouponToUpdate = await UserCouponRepository.findByUserIdAndCouponId(userId, couponId);
    if (!userCouponToUpdate) {
      throw new Error("UserCoupon non trouvé.");
    }

    userCouponToUpdate.discountCode = discountCode;
    return await UserCouponRepository.update(userCouponToUpdate);
  },

  // Méthode pour supprimer un UserCoupon
  deleteUserCoupon: async (userId, couponId) => {
    const userCouponToDelete = await UserCouponRepository.findByUserIdAndCouponId(userId, couponId);
    if (!userCouponToDelete) {
      throw new Error("UserCoupon non trouvé.");
    }

    return await UserCouponRepository.delete(userCouponToDelete);
  },

  // Récupère un UserCoupon avec les détails du Coupon
  async getUserCouponWithDetails(userId, couponId) {
    // Récupérer le UserCoupon
    const userCoupon = await UserCoupons.findOne({
      where: { userId, couponId },
    });

    if (!userCoupon) {
      throw new Error("UserCoupon introuvable.");
    }

    // Récupérer les détails du Coupon associé
    const coupon = await CouponRepository.findCouponById(userCoupon.couponId);

    if (!coupon) {
      throw new Error("Coupon introuvable.");
    }

    // Retourner les deux objets combinés
    return {
      userCoupon,
      coupon,
    };
  },
};
