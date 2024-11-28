'use client';

import { Checkbox } from '@/components/common/Checkbox';
import { Skeleton } from '@/components/common/Skeleton';
import { useGetCoupons } from '@/hooks/useGetCoupons';
import { Coupon } from '@/services/coupons.service';
import { useCartStore } from '@/store/cart.store';
import { useSessionStore } from '@/store/session.store';
import { AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { CouponItem } from './CouponItem';

export type CartItem = {
  quantity: number;
} & Pick<Coupon, 'brand' | 'percentReduction' | 'cashReduction' | 'id'>;

export const CouponsList = () => {
  const { data: coupons, isLoading } = useGetCoupons();
  const [showUnavailable, setShowUnavailable] = useState(false);
  const session = useSessionStore((state) => state.session);
  const cart = useCartStore((state) => state.cart);

  const totalCartCost =
    cart?.reduce((total, item) => {
      return total + item.quantity * item.coinCost;
    }, 0) ?? 0;

  const miamsAvailable = useMemo(() => {
    return (session?.user?.coins ?? 0) - totalCartCost;
  }, [session?.user?.coins, totalCartCost]);

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

  return (
    <div className="bg-purple-100 py-16 min-h-[60vh]">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explorez les différents bons de réduction
        </h2>
        {miamsAvailable < 10 && !session ? (
          <div className="text-center">
            Plus aucun coupon disponible car vous n&apos;avez pas assez de
            miams.
          </div>
        ) : (
          <>
            {session ? (
              <label className="flex items-center justify-center mb-4 sticky top-24">
                <Checkbox
                  onClick={() => {
                    setShowUnavailable(!showUnavailable);
                  }}
                  className=" h-5 w-5 "
                />
                <span className="ml-2">
                  Afficher les coupons non disponibles
                </span>
              </label>
            ) : null}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {coupons.map((coupon, index) =>
                  session ? (
                    (showUnavailable || coupon.coinCost <= miamsAvailable) && (
                      <CouponItem
                        key={coupon.id}
                        coupon={coupon}
                        index={index}
                        unavailable={coupon.coinCost > miamsAvailable}
                      />
                    )
                  ) : (
                    <CouponItem
                      key={coupon.id}
                      coupon={coupon}
                      index={index}
                      unavailable={true}
                    />
                  )
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
