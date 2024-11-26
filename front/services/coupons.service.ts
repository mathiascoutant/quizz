import { api, constructUrl } from './api.service';

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

const GETSELF = async (userId: string) => {
  const response = await api(`/user-coupons/${userId}`);

  if (!response.ok) {
    throw new Error('Error fetching categories');
  }

  return (await response.json()) as Coupon[];
};

const POST = async (body: { couponId: string; quantity: number }[]) => {
  const response = await api('/coupons/pay', 'POST', body);

  if (!response.ok) {
    throw new Error('Error fetching categories');
  }

  return true;
};

const couponsService = {
  GET,
  GETSELF,
  POST,
};

export default couponsService;
