import { CouponRepository } from '../repositories/couponRepository.js';
import { userCouponService } from '../services/userCouponService.js';
import  UserCoupon  from '../models/userCouponModel.js'; 
import  Coupon  from '../models/couponModel.js'

export const createUserCoupon = async (req, res) => {
  try {
    const newUserCoupon = await userCouponService.createUserCoupon(req.body);
    res.status(201).json(newUserCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du UserCoupon.', error: error.message });
  }
};

export const getAllUserCoupons = async (req, res) => {
  try {
    const userCoupons = await userCouponService.getAllUserCoupons();

    res.status(200).json(userCoupons);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des UserCoupons.', error: error.message });
  }
};

export const getUserCouponById = async (req, res) => {
  const { userId, couponId } = req.params;
  try {
  
    const data = await userCouponService.getUserCouponWithDetails(userId, couponId);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



export const getUserCouponsByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10); 
    console.log('userId:', userId);

    const userCoupons = await UserCoupon.findAll({
      where: { userId },
    });

    // Ajouter les détails des Coupons
    const userCouponsWithDetails = await Promise.all(
      userCoupons.map(async (userCoupon) => {
        const coupon = await CouponRepository.findCouponById(userCoupon.couponId);

        return {
          ...userCoupon.dataValues, 
          coupon, 
        };
      })
    );

    
    res.status(200).json(userCouponsWithDetails);
  } catch (error) {
    console.error('Erreur lors de la récupération des UserCoupons:', error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des UserCoupons.', error: error.message });
  }
};


export const updateUserCoupon = async (req, res) => {
  const { userId, couponId } = req.params;
  const { discountCode } = req.body;
  try {
    const updatedUserCoupon = await userCouponService.updateUserCoupon(userId, couponId, discountCode);
    res.status(200).json(updatedUserCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du UserCoupon.', error: error.message });
  }
};

export const deleteUserCoupon = async (req, res) => {
  const { userId, couponId } = req.params;
  try {
    await userCouponService.deleteUserCoupon(userId, couponId);
    res.status(204).json({ message: 'UserCoupon supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du UserCoupon.', error: error.message });
  }
};
