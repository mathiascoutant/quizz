import { MyCouponsList } from '@/containers/coupons/MyCouponsList';
import { Suspense } from 'react';

export default async function MesCouponsPage() {
  return (
    <section className="bg-gray-100 pt-12">
      <Suspense fallback={<div>Loading...</div>}>
        <MyCouponsList />
      </Suspense>
    </section>
  );
}
