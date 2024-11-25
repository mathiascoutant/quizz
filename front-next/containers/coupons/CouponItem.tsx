import { Coupon } from '@/services/coupons.service';
import { useCartStore } from '@/store/cart.store';

export const CouponItem = ({ coupon }: { coupon: Coupon }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div>
      <div
        style={{ backgroundColor: coupon.color }}
        className="max-w-1/3 h-40 rounded-lg flex flex-col justify-between items-start"
      >
        <div className="flex flex-col w-full">
          <div className='flex justify-end'>
          <strong className="pr-2 pt-1 text-lg" style={{ color: 'white' }}>
            -{coupon.cashReduction 
              ? `${coupon.cashReduction} €` 
              : `${coupon.percentReduction}%`}
          </strong>
          </div>
          <p className="text-white text-center flex-grow">{coupon.brand}</p>
        </div>
      </div>
      <div className="p-2">
        <p className="text-xs italic" style={{ color: coupon.color }}>
          * {coupon.specificContent}
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
        Ajouter au panier - {coupon.coinCost} 
        <img src={'/assets/coin.png'} className="w-4 h-4 inline" alt="coin" />
      </button>
    </div>
  );
};
