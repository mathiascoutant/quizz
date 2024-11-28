'use client';

import { Button, ButtonLink } from '@/components/common/Button';
import authService from '@/services/auth.service';
import couponsService from '@/services/coupons.service';
import { useCartStore } from '@/store/cart.store';
import { useSessionStore } from '@/store/session.store';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState, useTransition } from 'react';
import { toast } from 'sonner';

export const Cart = () => {
  const { cart, clearCart, removeFromCart } = useCartStore();
  const { session, updateUser } = useSessionStore();
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const total = useMemo(() => {
    if (!cart) return 0;

    return cart
      .reduce((total, item) => total + item.quantity * item.coinCost, 0)
      .toFixed(2);
  }, [cart]);

  const calculateFraisTransaction = () => {
    if (!cart) return 0;

    const reduceTotal = cart.reduce((total, item) => total + item.quantity, 0);

    return (Number(total) / reduceTotal / 5).toFixed(2);
  };

  const [fraisTransaction, setFraisTransaction] = useState(
    calculateFraisTransaction()
  );

  const handleApplyDiscountCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const discountCode = formData.get('discountCode') as string;

    if (discountCode === 'SANS_FRAIS') {
      setFraisTransaction(0);
      toast.success('Code de réducation appliqué.');
    } else {
      setFraisTransaction(calculateFraisTransaction());
    }
  };

  if (!session) return null;

  if (!cart || cart.length === 0) {
    return (
      <div className="mx-auto my-32 p-4 shadow-lg rounded-lg flex max-w-7xl border">
        <div className="flex-1 p-4 px-6">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">
              Votre panier est tristement vide
            </h1>
            <span className="font-bold text-2xl mt-2">:-(</span>
            <span className="text-sm mt-2">En manque d&apos;inspiration ?</span>
            <ButtonLink href="/coupons" className="mt-6">
              Voir les coupons
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto my-32 p-4 shadow-lg rounded-lg flex max-w-7xl border">
      <div className="flex-1 p-4 border-r px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mon Panier</h1>
          <span>
            <b>{cart.length}</b> bons
          </span>
        </div>
        <hr className="mt-2"></hr>
        <div className="mt-4">
          {cart.map((item, i) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: {
                  opacity: 1,

                  y: 0,
                  transition: { duration: 0.3, delay: i * 0.05 },
                },
              }}
              initial="hidden"
              animate="show"
              className="p-4 border rounded-lg shadow-md flex items-center mb-2"
              key={item.id}
            >
              <div className="flex w-[70%] items-center ml-4">
                <Image
                  src="/assets/images/coupon.png"
                  alt="Coupon"
                  width={48}
                  height={48}
                  className="object-contain mr-4"
                />
                <div className="flex flex-col justify-center border-black border-l-2 pl-4">
                  <span>
                    <b>Coupon</b>
                  </span>
                  <span>{item.brand}</span>
                  <span className="text-xs font-bold">
                    {item.percentReduction
                      ? `${item.percentReduction}%`
                      : `${item.cashReduction}€`}
                  </span>
                </div>
              </div>

              <div className="w-[20%]">
                <p className="font-bold flex items-center">
                  <Image
                    width={16}
                    height={16}
                    alt=""
                    src="/assets/coin.png"
                    className="w-4 h-4 object-contain mr-1"
                  />{' '}
                  {(item.quantity * item.coinCost).toFixed(2)}
                </p>
              </div>
              <div className="flex-1 mr-4 flex justify-end">
                <button
                  onClick={() => removeFromCart(item)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <ButtonLink className="mt-6 block w-fit" href="/coupons">
          Retourner vers les coupons
        </ButtonLink>
      </div>
      <div className="flex-3 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Résumé du Panier</h1>
          </div>
          <hr className="mt-2"></hr>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <span>
                <b>{cart.length}</b> bons
              </span>
              <p className="flex items-center">
                <Image
                  width={16}
                  height={16}
                  alt=""
                  src="/assets/coin.png"
                  className="object-contain mr-1"
                />{' '}
                {total}
              </p>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">Frais de transaction</span>
              <p className="text-xs flex items-center">
                <Image
                  width={16}
                  height={16}
                  alt=""
                  src="/assets/coin.png"
                  className="object-contain mr-1"
                />{' '}
                {fraisTransaction}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-12">
            <p className="text-xs mb-1">
              <u>Vous avez un code ?</u>
            </p>
            <form className="flex" onSubmit={handleApplyDiscountCode}>
              <input
                type="text"
                name="discountCode"
                placeholder="Code de réduction..."
                className="border rounded p-2 w-full mr-4"
              />
              <Button className="text-xs px-2" type="submit">
                Appliquer
              </Button>
            </form>
          </div>
          <hr className="mt-4 mb-2" />
          <div className="flex justify-between">
            <span className="font-bold">TOTAL A PAYER :</span>
            <p className="font-bold flex items-center">
              <Image
                width={16}
                height={16}
                alt=""
                src="/assets/coin.png"
                className="object-contain mr-1"
              />{' '}
              {(
                parseFloat(String(total)) + parseFloat(String(fraisTransaction))
              ).toFixed(2)}
            </p>
          </div>
          <div className="flex justify-center mt-2">
            <Button
              className="w-full"
              isLoading={pending}
              onClick={async () => {
                try {
                  startTransition(async () => {
                    const payload = cart.map((item) => ({
                      couponId: item.id,
                      quantity: item.quantity,
                    }));
                    await couponsService.POST(payload);
                    clearCart();
                    await authService.REFRESH({ session, updateUser });
                    toast.success('Paiement réussi.');
                    router.push('/mes-coupons');
                  });
                } catch (error) {
                  toast.error('Paiement refusé.');
                  throw error;
                }
              }}
            >
              Payer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
