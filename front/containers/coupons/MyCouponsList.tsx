'use client';

import { Skeleton } from '@/components/common/Skeleton';
import { useGetMyCoupons } from '@/hooks/useGetMyCoupons'; // Assurez-vous d'avoir un hook pour récupérer vos coupons
import { Coupon } from '@/services/coupons.service';
import { useState } from 'react';
import { MyCouponItem } from './MyCouponItem';

export const MyCouponsList = () => {
  const { data: coupons, isLoading } = useGetMyCoupons();
  const [showUnavailable, setShowUnavailable] = useState(false);

  const handleToggle = () => {
    setShowUnavailable(!showUnavailable);
  };

  if (isLoading || !coupons)
    return (
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[160px] rounded-lg" />
          ))}
        </div>
      </div>
    );

  return (
    <div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupons.map((coupon) => (
            <MyCouponItem key={coupon.id} coupon={coupon.coupon} />
          ))}
        </div>
      </div>
    </div>
  );
}; 