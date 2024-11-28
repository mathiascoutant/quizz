'use client';

import { Button } from '@/components/common/Button';
import authService from '@/services/auth.service';
import couponsService from '@/services/coupons.service';
import { useCartStore } from '@/store/cart.store';
import { useSessionStore } from '@/store/session.store';
import { toast } from 'sonner';
import { useState } from 'react';

export const Cart = () => {
  const { cart, clearCart, removeFromCart } = useCartStore();
  const { session, updateUser } = useSessionStore();

  if (session == null) {
    window.location.href = '/';
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="mx-auto my-32 p-4 shadow-lg rounded-lg flex max-w-7xl border">
        <div className="flex-1 p-4 px-6">
          <div className='flex flex-col items-center justify-center'>
            <h1 className="text-2xl font-bold">Votre panier est tristement vide</h1>
            <span className='font-bold text-2xl mt-2'>:-(</span>
            <span className='text-sm mt-2'>En manque d'inspiration ?</span>
            <Button className='mt-6' onClick={() => window.location.href = '/coupons'}>Retourner vers les coupons</Button>
          </div>
        </div>
      </div>
    );
  }

  const total = cart.reduce((total, item) => total + (item.quantity * item.coinCost), 0).toFixed(2);

  const calculateFraisTransaction = () => {
    return (total / cart.reduce((total, item) => total + item.quantity, 0)).toFixed(2) / 5 || '0.00';
  };

  const [fraisTransaction, setFraisTransaction] = useState(calculateFraisTransaction());

  return (
    <div className="mx-auto my-32 p-4 shadow-lg rounded-lg flex max-w-7xl border">
      <div className="flex-1 p-4 border-r px-6">
        <div className='flex items-center justify-between'>
          <h1 className="text-2xl font-bold">Mon Panier</h1>
          <span><b>{cart.length}</b> bons</span>
        </div>
        <hr className='mt-2'></hr>
        <div className="mt-4">
          {cart.map((item) => (
            <div
              className="p-4 border rounded-lg shadow-md flex items-center mb-2"
              key={item.id}
            >
              <div className="flex w-[45%] items-center ml-4">
                <img
                  src="/assets/images/coupon.png"
                  alt="Coupon"
                  className="w-12 h-12 object-contain mr-4"
                />
                <div className='flex flex-col justify-center border-l border-black border-l-2 pl-4'>
                  <span><b>Coupon</b></span>
                  <span>{item.brand}</span>
                  <span className='text-xs font-bold'>{item.percentReduction ? `${item.percentReduction}%` : `${item.cashReduction}€`}</span>
                </div>
              </div>
              <div className='w-[20%] justify-center'>
                <Button className='rounded-none px-2 py-0'>-</Button>
                <span className='mx-2 font-bold'>{item.quantity}</span>
                <Button className='rounded-none px-2 py-0'>+</Button>
              </div>
              <div className='w-[30%]'>
                <p className='font-bold flex items-center'><img src="/assets/coin.png" className="w-4 h-4 object-contain mr-1"></img> {(item.quantity * item.coinCost).toFixed(2)}</p>
              </div>
              <div className='flex mr-4 justify-end'>
                <button
                  onClick={() => removeFromCart(item)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
        <Button className='mt-6' onClick={() => window.location.href = '/coupons'}>Retourner vers les coupons</Button>
      </div>
      <div className="flex-3 p-4 flex flex-col justify-between">
        <div>
          <div className='flex items-center'>
            <h1 className="text-2xl font-bold">Résumé du Panier</h1>
          </div>
          <hr className='mt-2'></hr>
          <div className="mt-4 flex flex-col justify-between">
            <div className='flex justify-between'>
              <span><b>{cart.length}</b> bons</span>
              <p className='flex items-center'><img src="/assets/coin.png" className="w-4 h-4 object-contain mr-1"></img> {total}</p>
            </div>
            <div className='flex justify-between'>
              <span className='text-xs'>Frais de transaction</span>
              <p className='text-xs flex items-center'><img src="/assets/coin.png" className="w-4 h-4 object-contain mr-1"></img> {fraisTransaction}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-12">
            <p className='text-xs mb-1'><u>Vous avez un code ?</u></p>
            <div className='flex'>
              <input
                type="text"
                placeholder="Code de réduction..."
                className="border rounded p-2 w-full mr-4"></input>
              <Button className='text-xs px-2' onClick={() => {
                const discountCode = document.querySelector('input[placeholder="Code de réduction..."]').value;
                if (discountCode === 'SANS_FRAIS') {
                  setFraisTransaction(0);
                  toast("Code de réducation appliqué.")
                } else {
                  setFraisTransaction(calculateFraisTransaction());
                }
              }}>Appliquer</Button>
            </div>
          </div>
          <hr className='mt-4 mb-2' />
          <div className='flex justify-between'>
            <span className='font-bold'>TOTAL A PAYER :</span>
            <p className='font-bold flex items-center'><img src="/assets/coin.png" className="w-4 h-4 object-contain mr-1"></img> {(parseFloat(total) + parseFloat(fraisTransaction)).toFixed(2)}</p>
          </div>
          <div className='flex justify-center mt-2'>
            <Button onClick={async () => {
              try {
                let payload = cart.map(item => ({
                  couponId: item.id,
                  quantity: item.quantity
                }));
                await couponsService.POST(payload);
                clearCart();
                await authService.REFRESH({ session, updateUser });
                toast.success("Paiement réussi.")
              } catch (error) {
                toast.error('Paiement refusé.')
                throw error
              }
            }}>Payer</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
