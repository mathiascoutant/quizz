import { Coupon } from '@/services/coupons.service';
import { useCartStore } from '@/store/cart.store';
import { useSessionStore } from '@/store/session.store';

export const CouponItem = ({ coupon }: { coupon: Coupon }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const session = useSessionStore((state) => state.session);

  const miamsAvailable = session?.user.coins;

  return (
    <div>
      <div
        style={{ backgroundColor: coupon.color, position: 'relative', opacity: coupon.coinCost > miamsAvailable ? 0.3 : 1 }}
        className={`max-w-1/3 h-40 rounded-lg flex flex-col justify-between items-start ${coupon.coinCost > miamsAvailable ? 'opacity-50' : ''}`}
      >
        <div className="flex flex-col w-full h-full justify-between">
          <div className='flex justify-end'>
          <strong className="pr-3 pt-2 text-lg" style={{ color: 'white' }}>
            -{coupon.cashReduction 
              ? `${coupon.cashReduction} €` 
              : `${coupon.percentReduction}%`}
          </strong>
          </div>
          <p className="text-white text-center flex-grow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            {coupon.brand}
          </p>
          <div className='flex'>
            <p className="pl-2 pb-1 text-xs italic" style={{ color: 'white' }}>
              * {coupon.specificContent}
            </p>
          </div>
        </div>
      </div>
      <button
        className={`w-full mt-4 py-2 px-4 ${coupon.coinCost > miamsAvailable ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} text-white rounded-none font-semibold transition-colors`}
        onClick={() => {
          if (coupon.coinCost <= miamsAvailable) {
            addToCart({
              brand: coupon.brand,
              percentReduction: coupon.percentReduction,
              id: coupon.id,
              quantity: 1,
            });
          }
        }}
        disabled={coupon.coinCost > miamsAvailable}
      >
        Ajouter au panier - {coupon.coinCost} 
        <img src={'/assets/coin.png'} className="w-4 h-4 inline" alt="coin" />
      </button>
    </div>
  );
};