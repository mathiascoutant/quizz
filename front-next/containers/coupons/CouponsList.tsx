'use client';

import { useGetCoupons } from '@/hooks/useGetCoupons';
import { Coupon } from '@/services/coupons.service';
import { CouponItem } from './CouponItem';

export type CartItem = {
  quantity: number;
} & Pick<Coupon, 'brand' | 'percentReduction' | 'id'>;

export const CouponsList = () => {
  const { data: coupons, isLoading } = useGetCoupons();

  if (isLoading || !coupons) return <div>Loading...</div>;

  return (
    <div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupons.map((coupon) => (
            <CouponItem key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </div>
    </div>
  );
};
