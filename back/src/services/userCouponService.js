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

  // Méthode pour récupérer tous les UserCoupons d'un utilisateur avec quantité
  getUserCouponsByUserId: async (userId) => {
    const userCoupons = await UserCouponRepository.findAllByUserId(userId);

    if (userCoupons.length === 0) {
        throw new Error("Aucun UserCoupon trouvé pour cet utilisateur.");
    }

    // Regrouper les coupons par couponId
    const groupedCoupons = userCoupons.reduce((acc, coupon) => {
        const existingCoupon = acc.find(c => c.couponId === coupon.couponId);
        if (existingCoupon) {
            existingCoupon.quantity += 1; // Incrémente la quantité
        } else {
            const couponDetails = coupon.coupon || {}; // Utiliser un objet vide si coupon.coupon est null

            acc.push({ 
                id: coupon.id,
                userId: coupon.userId,
                couponId: coupon.couponId,
                discountCode: coupon.discountCode,
                quantity: 1, // Initialiser la quantité
                coupon: { // Inclure les détails du coupon dans un objet
                    id: couponDetails.id,
                    cashReduction: couponDetails.cashReduction,
                    percentReduction: couponDetails.percentReduction,
                    nameNominator: couponDetails.nameNominator || "Inconnu", // Valeur par défaut si null
                    brand: couponDetails.brand || "Inconnu", // Valeur par défaut si null
                    specificContent: couponDetails.specificContent || "Aucun contenu spécifique", // Valeur par défaut si null
                    coinCost: couponDetails.coinCost !== null ? couponDetails.coinCost : 0, // Valeur par défaut si null
                    validityDate: couponDetails.validityDate || "Aucune date de validité", // Valeur par défaut si null
                    color: couponDetails.color || "#FFFFFF" // Valeur par défaut si null
                }
            });
        }
        return acc;
    }, []);

    return groupedCoupons; // Retourne les coupons groupés
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
