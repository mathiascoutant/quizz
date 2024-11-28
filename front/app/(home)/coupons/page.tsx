import { CouponsList } from '@/containers/coupons/CouponsList';
import { Suspense } from 'react';

export default function DiscountsPage() {
  return (
    <section className="bg-gray-100 pt-12">
      <Suspense fallback={<div>Loading...</div>}>
        <CouponsList />
      </Suspense>
    </section>
  );
}
