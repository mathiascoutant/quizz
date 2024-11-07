'use client';

import { Button } from '@/components/common/Button';
import { useCartStore } from '@/store/cart.store';

export const Cart = () => {
  const { cart, clearCart, removeFromCart } = useCartStore();
  return (
    <div className="max-w-lg mx-auto my-48 p-4 bg-white">
      <h1 className="text-2xl font-bold text-center">Mon Panier</h1>
      <div className="mt-4">
        {cart
          ? cart.map((item) => (
              <div
                className="p-4 border rounded-lg shadow-md flex flex-col gap-2"
                key={item.id}
              >
                <img
                  src="/assets/coin.png"
                  alt="Coupon"
                  className="w-24 h-24 object-contain"
                />
                <div className="flex justify-between">
                  <span>{item.brand}</span>
                  {item.percentReduction ? (
                    <span>{item.percentReduction}%</span>
                  ) : null}
                </div>
                <div className="flex justify-between">
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
      <div className="mt-4 flex justify-between">
        {cart && cart.length > 0 ? (
          <>
            <Button onClick={clearCart} variant="outline">
              Vider le panier
            </Button>

            <Button>Payer</Button>
          </>
        ) : (
          <small className="mx-auto w-fit">Votre panier est vide</small>
        )}
      </div>
    </div>
  );
};