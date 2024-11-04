import UserCoupon from '../models/userCouponModel.js';
import { User }  from '../models/userModel.js';  
import Coupon from '../models/couponModel.js';

// Create a new User-Coupon
export const createUserCoupon = async (req, res) => {
    const { userId, couponId, discountCode } = req.body;
  
    try {
      // check if the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
  
      //check if the coupon exists
      const coupon = await Coupon.findByPk(couponId);
      if (!coupon) {
        return res.status(404).json({ message: "Coupon non trouvé." });
      }
  
      const newUserCoupon = await UserCoupon.create({ userId, couponId, discountCode });
      res.status(201).json(newUserCoupon);
  
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création du UserCoupon.', error });
    }
  };

/// get all userCoupons
export const getAllUserCoupons = async (req, res) => {
  try {
    const userCoupons = await UserCoupon.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Coupon, as: 'coupon' }
      ]
    });
    res.status(200).json(userCoupons);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des UserCoupons.', error });
  }
};

// get a specific User-Coupon
export const getUserCouponById = async (req, res) => {
  const { userId, couponId } = req.params;
  
  try {
    const userCoupon = await UserCoupon.findOne({
      where: { userId, couponId },
      include: [
        { model: User, as: 'user' },
        { model: Coupon, as: 'coupon' }
      ]
    });
    
    if (!userCoupon) {
      return res.status(404).json({ message: 'UserCoupon non trouvé.' });
    }
    
    res.status(200).json(userCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du UserCoupon.', error });
  }
};

// get all userCoupons by userId
export const getUserCouponsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      const userCoupons = await UserCoupon.findAll({
        where: { userId },
        include: [
          { model: Coupon, as: 'coupon' } 
        ]
      });
  
      if (userCoupons.length === 0) {
        return res.status(404).json({ message: 'Aucun UserCoupon trouvé pour cet utilisateur.' });
      }
  
      res.status(200).json(userCoupons);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des UserCoupons.', error });
    }
  };
  

// Update a User-Coupon 
export const updateUserCoupon = async (req, res) => {
    const { userId, couponId } = req.params;
    const { discountCode } = req.body;
    
    try {
      const userCouponToUpdate = await UserCoupon.findOne({
        where: { userId, couponId }
      });
      
      if (!userCouponToUpdate) {
        return res.status(404).json({ message: 'UserCoupon non trouvé.' });
      }
      
      userCouponToUpdate.discountCode = discountCode;
      await userCouponToUpdate.save();
      res.status(200).json(userCouponToUpdate);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du UserCoupon.', error });
    }
  };
  
  // Supprimer une relation User-Coupon
  export const deleteUserCoupon = async (req, res) => {
    const { userId, couponId } = req.params;
    
    try {
      const userCouponToDelete = await UserCoupon.findOne({
        where: { userId, couponId }
      });
      
      if (!userCouponToDelete) {
        return res.status(404).json({ message: 'UserCoupon non trouvé.' });
      }
      
      await userCouponToDelete.destroy();
      res.status(204).json({ message: 'UserCoupon supprimé avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du UserCoupon.', error });
    }
  };
  
