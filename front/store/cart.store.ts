import { Coupon } from '@/services/coupons.service';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartState = {
  cart: CartItem[] | null;
  addToCart: (coupon: CartItem) => void;
  removeFromCart: (coupon: CartItem) => void;
  clearCart: () => void;
};

type CartItem = {
  id: string;
  quantity: number;
} & Pick<Coupon, 'brand' | 'percentReduction' | 'id' | 'coinCost'>;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      addToCart: (coupon: CartItem) => {
        const currentCart = get().cart;

        const isCouponAlreadyInCart = currentCart?.find(
          (item) => item.id === coupon.id
        );

        if (isCouponAlreadyInCart) {
          set({
            cart: currentCart?.map((item) =>
              item.id === coupon.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...(currentCart ?? []), coupon] });
        }
      },
      removeFromCart: (coupon: CartItem) => {
        const currentCart = get().cart;

        if (!currentCart) return;

        set({ cart: currentCart.filter((item) => item.id !== coupon.id) });
      },
      clearCart: () => {
        set({ cart: null });
      },
    }),
    {
      name: 'cart',
    }
  )
);
