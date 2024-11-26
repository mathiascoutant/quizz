import { CouponService } from '../services/couponService.js';
import { verifyToken } from '../utils/jwtUtils.js';

// CRUD de base pour les coupons
export const createCoupon = async (req, res) => {
  try {
    const newCoupon = await CouponService.createCoupon(req.body);
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du coupon.', error });
  }
};

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await CouponService.getAllCoupons();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des coupons.', error });
  }
};

export const getCouponById = async (req, res) => {
  try {
    const coupon = await CouponService.getCouponById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon non trouvé.' });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du coupon.', error });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const updatedCoupon = await CouponService.updateCoupon(req.params.id, req.body);
    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon non trouvé.' });
    }
    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du coupon.', error });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const deleted = await CouponService.deleteCoupon(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Coupon non trouvé.' });
    }
    res.status(200).json({ message: 'Coupon supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du coupon.', error });
  }
};

// Opérations spécifiques
export const getCouponsByBrand = async (req, res) => {
  try {
    const coupons = await CouponService.getCouponsByBrand(req.params.brand);
    if (coupons.length === 0) {
      return res.status(404).json({ message: 'Aucun coupon trouvé pour cette marque.' });
    }
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des coupons.', error });
  }
};

export const payCoupon = async (req, res) => {
  try {
    const userId = req.user.id;
    const { coupons } = req.body;

    const result = await CouponService.payCoupon(userId, coupons);
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.status(200).json({ message: 'Coupons appliqués avec succès.' });
  } catch (error) {
    console.error('Erreur dans payCoupon controller:', error);
    res.status(500).json({ message: 'Erreur lors de l\'application des coupons.', error: error.message });
  }
};
