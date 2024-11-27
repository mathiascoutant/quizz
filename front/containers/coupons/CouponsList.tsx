'use client';

import { Skeleton } from '@/components/common/Skeleton';
import { useGetCoupons } from '@/hooks/useGetCoupons';
import { Coupon } from '@/services/coupons.service';
import { useCartStore } from '@/store/cart.store';
import { useSessionStore } from '@/store/session.store';
import { useState } from 'react';
import { CouponItem } from './CouponItem';

export type CartItem = {
  quantity: number;
} & Pick<Coupon, 'brand' | 'percentReduction' | 'id'>;

export const CouponsList = () => {
  const { data: coupons, isLoading } = useGetCoupons();
  const [showUnavailable, setShowUnavailable] = useState(false);
  const session = useSessionStore((state) => state.session);
  const cart = useCartStore((state) => state.cart);

  const handleToggle = () => {
    setShowUnavailable(!showUnavailable);
  };

  if (isLoading || !coupons)
    return (
      <div className="bg-purple-100 py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explorez les différents bons de réduction
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-[186px] rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );

  const totalCartCost =
    cart?.reduce((total, item) => {
      return total + item.quantity * item.coinCost;
    }, 0) ?? 0;

  const miamsAvailable = (session?.user?.coins ?? 0) - totalCartCost;

  console.log(session);

  return (
    <div className="bg-purple-100 py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explorez les différents bons de réduction
        </h2>
        {miamsAvailable < 10 && session != null ? (
          <div className="text-center">
            Plus aucun coupon disponible car vous n'avez pas assez de miams.
          </div>
        ) : (
          <>
            {session != null ? (
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  onChange={handleToggle}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">
                  Afficher les coupons non disponibles
                </span>
              </label>
            ) : null}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coupons.map((coupon) =>
                session != null ? (
                  (showUnavailable || coupon.coinCost <= miamsAvailable) && (
                    <CouponItem
                      key={coupon.id}
                      coupon={coupon}
                      unavailable={coupon.coinCost > miamsAvailable}
                    />
                  )
                ) : (
                  <CouponItem
                    key={coupon.id}
                    coupon={coupon}
                    unavailable={true}
                  />
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
