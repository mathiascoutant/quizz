import { Coupon } from '@/services/coupons.service';
import { useCartStore } from '@/store/cart.store';

export const CouponItem = ({ coupon }: { coupon: Coupon }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div>
      <div
        className="absolute top-2 right-2 text-xl font-bold"
        style={{ color: coupon.color }}
      >
        {coupon.percentReduction}%
      </div>
      <div className="flex-grow flex items-center justify-center p-4">
        <img
          // FAIRE UN SWITCH SUR LA BRAND
          src={'/assets/coin.png'}
          alt={`${coupon.brand} logo`}
          className="max-w-1/3 max-h-1/3 object-contain"
        />
      </div>
      <div className="p-2">
        <p className="text-xs" style={{ color: coupon.color }}>
          {coupon.specificContent}
        </p>
      </div>
      <button
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-none font-semibold hover:bg-purple-700 transition-colors"
        onClick={() =>
          addToCart({
            brand: coupon.brand,
            percentReduction: coupon.percentReduction,
            id: coupon.id,
            quantity: 1,
          })
        }
      >
        Ajouter au panier
      </button>
    </div>
  );
};
