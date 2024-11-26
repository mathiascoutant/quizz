import { Coupon } from '@/services/coupons.service';
import { useCartStore } from '@/store/cart.store';
import { useSessionStore } from '@/store/session.store';
import { useState } from 'react';

export const CouponItem = ({ coupon, unavailable }: { coupon: Coupon, unavailable: boolean }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const session = useSessionStore((state) => state.session);
  const [isHovered, setIsHovered] = useState(false);

  const totalCartCost = cart?.reduce((total, item) => {
    return total + (item.quantity * item.coinCost);
  }, 0) ?? 0;

  let miamsAvailable = session?.user.coins - totalCartCost;

  return (
    <div>
      <div
        style={{ 
          backgroundColor: coupon.color, 
          position: 'relative', 
          opacity: unavailable ? 0.3 : 1,
          transition: 'transform 0.2s',
        }}
        className={`max-w-1/3 h-40 rounded-lg flex flex-col justify-between items-start ${coupon.coinCost > miamsAvailable ? 'opacity-50' : ''}`}
        onClick={() => {
          if (coupon.coinCost <= miamsAvailable) {
            addToCart({
              brand: coupon.brand,
              percentReduction: coupon.percentReduction,
              id: coupon.id,
              quantity: 1,
              coinCost: coupon.coinCost 
            });
            miamsAvailable -= 100;
          }
        }}
        onMouseEnter={(e) => {
          if (coupon.coinCost <= miamsAvailable) {
            setIsHovered(true);
            e.currentTarget.style.cursor = 'pointer';
            e.currentTarget.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (coupon.coinCost <= miamsAvailable) {
            setIsHovered(false);
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        {isHovered && (
          <div className='absolute bg-black w-full h-full opacity-40 rounded-lg'></div>
        )}
        <div className="flex flex-col w-full h-full justify-between">
          <div className='flex justify-end'>
          <strong className="pr-3 pt-2 text-lg" style={{ color: 'white' }}>
            -{coupon.cashReduction 
              ? `${coupon.cashReduction} €` 
              : `${coupon.percentReduction}%`}
          </strong>
          </div>
          <p className={`text-white text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-grow ${isHovered ? 'opacity-50' : ''}`}>
            {coupon.brand}
          </p>
          <div className='flex'>
            <p className="pl-2 pb-1 text-xs italic" style={{ color: 'white' }}>
              * {coupon.specificContent}
            </p>
          </div>
          {isHovered && (
            <div className="absolute bottom-4 right-8 transform translate-x-1/2 translate-y-1/2">
              <p className="text-white font-semibold flex items-center">
                {coupon.coinCost} <img src={'/assets/coin.png'} className="w-4 h-4 inline" alt="coin" />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};