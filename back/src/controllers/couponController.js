import Coupon from '../models/couponModel.js';


// ------------------------
// Basic CRUD Operations for Coupons
// ------------------------

// Create a new coupon
export const createCoupon = async (req, res) => {
  const { cashReduction, percentReduction, nameNominator, brand, specificContent, coinCost, validityDate, color } = req.body;
  
  try {
    const newCoupon = await Coupon.create({ cashReduction, percentReduction, nameNominator, brand, specificContent, coinCost, validityDate, color });
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du coupon.', error });
  }
};

// Get all coupons
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des coupons.', error });
  }
};

// get a coupon by Id
export const getCouponById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const coupon = await Coupon.findByPk(id);
    
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon non trouvé.' });
    }
    
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du coupon.', error });
  }
};

// update a coupon
export const updateCoupon = async (req, res) => {
  const { id } = req.params;
  const { cashReduction, percentReduction, nameNominator, brand, specificContent, coinCost, validityDate, color } = req.body;
  
  try {
    const couponToUpdate = await Coupon.findByPk(id);
    
    if (!couponToUpdate) {
      return res.status(404).json({ message: 'Coupon non trouvé.' });
    }
    
    couponToUpdate.cashReduction = cashReduction;
    couponToUpdate.percentReduction = percentReduction;
    couponToUpdate.nameNominator = nameNominator;
    couponToUpdate.brand = brand;
    couponToUpdate.specificContent = specificContent;
    couponToUpdate.coinCost = coinCost;
    couponToUpdate.validityDate = validityDate;
    couponToUpdate.color = color;
    
    await couponToUpdate.save();
    res.status(200).json(couponToUpdate);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du coupon.', error });
  }
};

// delete a coupon
export const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  
  try {
    const couponToDelete = await Coupon.findByPk(id);
    
    if (!couponToDelete) {
      return res.status(404).json({ message: 'Coupon non trouvé.' });
    }
    
    await couponToDelete.destroy();
    res.status(200).json({ message: 'Coupon supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du coupon.', error });
  }
};


// ------------------------
// Specific Operations for Coupons
// ------------------------

export const getCouponsByBrand = async (req, res) => {
  const { brand }  = req.params; // Récupérer la marque depuis les paramètres de l'URL
  
  
  try {
    const coupons = await Coupon.findAll({
      where: {  
        brand: brand
      }
    });
    
    if (coupons.length === 0) {
      return res.status(404).json({ message: 'Aucun coupon trouvé pour cette marque.' });
    }
    
    res.status(200).json(coupons); // Retourner la liste des coupons
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des coupons.', error: error.message });
  }
};