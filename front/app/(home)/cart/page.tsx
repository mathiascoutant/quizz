import { Cart } from '@/containers/cart/Cart';
import { Suspense } from 'react';

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Cart />;
    </Suspense>
  );
}
