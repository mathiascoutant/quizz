import { Coupon } from '@/services/coupons.service';
import { useCartStore } from '@/store/cart.store';
import { useSessionStore } from '@/store/session.store';
import { useEffect, useState } from 'react';

export const CouponItem = ({ coupon, unavailable, quantity = 0, discountCode }: { coupon: Coupon, unavailable: boolean, quantity: number, discountCode: string }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const session = useSessionStore((state) => state.session);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredAnimation, setIsHoveredAnimation] = useState(false);

  const totalCartCost = cart?.reduce((total, item) => {
    return total + (item.quantity * item.coinCost);
  }, 0) ?? 0;

  let miamsAvailable = session?.user.coins - totalCartCost;

  return (
    <div>
      <div className={`rounded-lg shadow-md p-2 relative text-center transition-transform duration-300 
          ${unavailable ? 'transform-none' : isHovered ? 'scale-105' : 'transform-none'} 
          h-[186px]`}
        style={{
          backgroundColor: `${unavailable ? coupon.color + '10' : coupon.color + '10'}`,
          border: `2px solid ${unavailable ? coupon.color + '10' : coupon.color}`,
        }}
        onClick={() => {
          if (!unavailable && quantity === 0) {
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
          if (!unavailable && quantity === 0) {
            setIsHovered(true);
            e.currentTarget.style.cursor = 'pointer';
            e.currentTarget.style.transform = 'scale(1.05)';
          }
          if (quantity !== 0 && !unavailable) {
            setIsHoveredAnimation(true);
            e.currentTarget.style.transform = 'rotateY(180deg)';
          }
        }}
        onMouseLeave={(e) => {
          if (!unavailable && quantity === 0) {
            setIsHovered(false);
            e.currentTarget.style.transform = 'scale(1)';
          }
          if (quantity !== 0 && !unavailable) {
            setIsHoveredAnimation(false);
            e.currentTarget.style.transform = 'rotateY(0deg)';
          }
        }}
      >
        {isHovered && (
          <div className='absolute w-full h-full inset-0 bg-black backdrop-blur-xl rounded-lg opacity-10 z-20'></div>
        )}
        <div className="flex flex-col w-full h-full justify-between">
          {quantity === 0 && unavailable && (
            <img src={'/assets/images/locked.png'} alt="Coupon bloqué" className="w-6 h-6 absolute top-3 left-3" />
          )}
          <div className={`flex ${quantity === 0 ? 'justify-end' : 'justify-between items-center'}`}>
            {quantity !== 0 && !unavailable && !isHoveredAnimation && (
              <div className="ml-1 mt-1 flex items-center justify-center w-7 h-7 rounded-full border-2 border-black">
                <strong className="text-sm" style={{ color: 'black' }}>
                  {quantity}
                </strong>
              </div>
            )}
            {!isHoveredAnimation && (
              <strong className={`pr-3 pt-2 text-lg text-black ${isHovered ? 'opacity-50' : ''} ${unavailable ? 'opacity-20' : 'opacity-100'}`}>
                -{coupon.cashReduction
                  ? `${coupon.cashReduction} €`
                  : `${coupon.percentReduction}%`}
              </strong>
            )}
          </div>
          <p className={`w-full text-black text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-grow ${isHovered ? 'opacity-50' : ''} ${unavailable ? 'opacity-20' : 'opacity-100'} `}>
            {isHoveredAnimation ? <><u>Code :</u> <b>{discountCode}</b></> : coupon.brand}
          </p>
          {!isHoveredAnimation && (
            <div className='flex justify-between items-center'>
              <p className={`pl-2 pb-1 text-xs italic text-black ${isHovered ? 'opacity-50' : ''} ${unavailable ? 'opacity-20' : 'opacity-100'} `}>
                <b>*</b> {coupon.specificContent}
              </p>
              {quantity !== 0 && (
                <p className={`pr-2 pb-1 italic `}
                  style={{
                    fontSize: `0.6rem`,
                  }}>
                  {coupon.validityDate}
                </p>
              )}
            </div>
          )}
          {isHovered && (
            <div className="absolute bottom-4 right-8 transform translate-x-1/2 translate-y-1/2">
              <p className="text-black font-semibold flex items-center">
                {coupon.coinCost} <img src={'/assets/coin.png'} className="w-4 h-4 inline" alt="coin" />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};