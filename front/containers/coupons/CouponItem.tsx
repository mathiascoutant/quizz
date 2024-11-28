'use client';

import { Coupon, SelfCoupon } from '@/services/coupons.service';
import { useCartStore } from '@/store/cart.store';
import { cn } from '@/utils/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { toast } from 'sonner';

const CouponItem = ({
  coupon,
  unavailable,
  index,
}: {
  coupon: Coupon;
  unavailable: boolean;
  index: number;
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.3, delay: index * 0.03 },
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        y: 10,
        transition: {
          duration: 0.3,
          delay: index * 0.03,
        },
      }}
      className={cn('group', {
        'pointer-events-none select-none': unavailable,
      })}
    >
      <div
        className={cn(
          'rounded-lg  shadow-md p-2 cursor-pointer relative text-center active:translate-y-1 hover:scale-105 transition-transform duration-300 h-[186px]'
        )}
        style={{
          backgroundColor: `${
            unavailable ? coupon.color + '10' : coupon.color + '10'
          }`,
          border: `2px solid ${
            unavailable ? coupon.color + '10' : coupon.color
          }`,
        }}
        onClick={() => {
          addToCart({
            brand: coupon.brand,
            percentReduction: coupon.percentReduction,
            id: coupon.id,
            quantity: 1,
            coinCost: coupon.coinCost,
            cashReduction: coupon.cashReduction,
          });

          toast.success(
            `Le coupon ${coupon.brand} a été ajouté à votre panier`
          );
        }}
      >
        <div className="absolute  w-full h-full inset-0 bg-black backdrop-blur-xl rounded-lg opacity-10 z-20"></div>

        <div className="flex flex-col w-full h-full justify-between">
          {unavailable && (
            <Image
              src={'/assets/images/locked.png'}
              alt="Coupon bloqué"
              width={0}
              height={0}
              sizes="100vw"
              className="w-6 h-6 absolute top-3 left-3"
            />
          )}
          <div className={cn('flex justify-end')}>
            <strong
              className={cn(
                'pr-3 pt-2 text-lg text-black opacity-100 group-hover:opacity-50',
                {
                  'opacity-20': unavailable,
                }
              )}
            >
              -
              {coupon.cashReduction
                ? `${coupon.cashReduction} €`
                : `${coupon.percentReduction}%`}
            </strong>
          </div>
          <p
            className={cn(
              'w-full text-black group-hover:scaleX(-1) text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-grow group-hover:opacity-50',
              {
                'opacity-20': unavailable,
              }
            )}
          >
            {coupon.brand}
          </p>

          <div
            className={cn('flex justify-between items-center', {
              'opacity-20': unavailable,
            })}
          >
            <p
              className={`pl-2 pb-1 group-hover:opacity-50 text-xs italic text-black`}
            >
              <b>*</b> {coupon.specificContent}
            </p>
          </div>

          {!unavailable && (
            <div
              className={cn(
                'absolute opacity-0 group-hover:opacity-100 bottom-4 right-8 transform translate-x-1/2 translate-y-1/2'
              )}
            >
              <p className="text-black font-semibold flex items-center">
                {coupon.coinCost}{' '}
                <Image
                  src={'/assets/coin.png'}
                  className="size-4 inline"
                  alt="coin"
                  width={0}
                  height={0}
                />
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SelfCouponItem = ({
  coupon,
  discountCode,
  quantity,
  index,
}: {
  coupon: SelfCoupon['coupon'];
  discountCode: string;
  quantity: number;
  index: number;
}) => {
  return (
    <motion.div
      className="group"
      layout
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.3, delay: index * 0.03 },
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        y: 10,
        transition: {
          duration: 0.3,
          delay: index * 0.03,
        },
      }}
    >
      <div
        className={cn(
          'rounded-lg  shadow-md p-2 relative group-hover:-scale-x-100 text-center transition-transform duration-300 h-[186px]'
        )}
        style={{
          backgroundColor: `${coupon.color + '10'}`,
          border: `2px solid ${coupon.color}`,
        }}
      >
        <div
          className="absolute group-hover:opacity-100 w-full h-full inset-0  backdrop-blur-xl rounded-lg opacity-0 -z-1"
          style={{
            backgroundColor: `${coupon.color + '10'}`,
          }}
        ></div>

        <div className="flex flex-col w-full h-full justify-between">
          <div className="flex justify-between items-center">
            <div className="ml-1 mt-1 flex items-center justify-center w-7 h-7 rounded-full border-2 border-black">
              <strong className="text-sm" style={{ color: 'black' }}>
                {quantity}
              </strong>
            </div>

            <strong className={cn('pr-3 pt-2 text-lg text-black opacity-100')}>
              -
              {coupon.cashReduction
                ? `${coupon.cashReduction} €`
                : `${coupon.percentReduction}%`}
            </strong>
          </div>

          <p
            className={`w-full text-black   text-center absolute group-hover:-scale-x-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-grow`}
          >
            <u className="hidden group-hover:block ">Code :</u>{' '}
            <b className="hidden group-hover:block">{discountCode}</b>
            <span className="group-hover:hidden block">{coupon.brand}</span>
          </p>

          <div className="flex justify-between items-center">
            <p className={`pl-2 pb-1 text-xs italic text-black`}>
              <b>*</b> {coupon.specificContent}
            </p>
            {quantity !== 0 && (
              <p
                className={`pr-2 pb-1 italic `}
                style={{
                  fontSize: `0.6rem`,
                }}
              >
                {coupon.validityDate}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export { CouponItem, SelfCouponItem };
