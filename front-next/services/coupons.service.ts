import { constructUrl } from './api.service';

export interface Coupon {
  id: string;
  cashReduction?: string;
  percentReduction: string;
  nameNominator: string;
  brand: string;
  specificContent: string;
  coinCost: number;
  validityDate: string;
  color: string;
}

const GET = async () => {
  const response = await fetch(constructUrl('/coupons'));

  if (!response.ok) {
    throw new Error('Error fetching categories');
  }

  return (await response.json()) as Coupon[];
};

const couponsService = {
  GET,
};

export default couponsService;
