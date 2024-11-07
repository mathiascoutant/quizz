import { userCouponService } from '../services/userCouponService.js';

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
    const userCoupon = await userCouponService.getUserCouponById(userId, couponId);
    res.status(200).json(userCoupon);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserCouponsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const userCoupons = await userCouponService.getUserCouponsByUserId(userId);
    res.status(200).json(userCoupons);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
