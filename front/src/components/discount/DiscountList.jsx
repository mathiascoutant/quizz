import React, { useState, useEffect } from 'react';
import nikelogo from '../../assets/logos/nike-logo.png';
import ikealogo from '../../assets/logos/ikea-logo.png';
import ubereatslogo from '../../assets/logos/ubereats-logo.png';
import ynovlogo from '../../assets/logos/ynov-logo.png';
import { DiscountSearch } from './DiscountSearch';

export const discountsData = [
  {
    "id": 1,
    "brand": "Nike",
    "logo": nikelogo,
    "discount": "-20%",
    "backgroundColor": "black",
    "textColor": "white",
    "condition": "* Uniquement sur certains articles"
  },
  {
    "id": 2,
    "brand": "Ikea",
    "logo": ikealogo,
    "discount": "-15€",
    "backgroundColor": "#0051BA",
    "textColor": "yellow",
    "condition": "* Sur tout le magasin"
  },
  {
    "id": 3,
    "brand": "UberEats",
    "logo": ubereatslogo,
    "discount": "-5€",
    "backgroundColor": "#06C167",
    "textColor": "white",
    "condition": "* Sur votre prochaine commande"
  },
  {
    "id": 4,
    "brand": "Ynov",
    "logo": ynovlogo,
    "discount": "-10%",
    "backgroundColor": "#FF5A5F",
    "textColor": "white",
    "condition": "* Sur les frais de scolarité"
  }
];

export const DiscountList = ({ discounts }) => {
  const [filteredDiscounts, setFilteredDiscounts] = useState(discounts);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = document.cookie.split("; ").find((row) => row.startsWith("cart="))?.split("=")[1];
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (discount) => {
    const existingItem = cart.find(item => item.brand === discount.brand);
    let newCart;

    if (existingItem) {
      // Si l'article existe déjà, on augmente la quantité
      newCart = cart.map(item => 
        item.brand === discount.brand 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      // Sinon, on l'ajoute avec une quantité de 1
      newCart = [...cart, { brand: discount.brand, quantity: 1 }];
    }

    setCart(newCart);
    document.cookie = `cart=${JSON.stringify(newCart)}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; SameSite=None; Secure`;
  };

  return (
    <div>
      <DiscountSearch setDiscounts={setFilteredDiscounts} />
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDiscounts.map((discount) => (
            <DiscountItem 
              key={discount.id} 
              discount={discount} 
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const DiscountItem = ({ discount, addToCart }) => {
  return (
    <div 

    >
      <div className="absolute top-2 right-2 text-xl font-bold" style={{ color: discount.textColor }}>
        {discount.discount}
      </div>
      <div className="flex-grow flex items-center justify-center p-4">
        <img src={discount.logo} alt={`${discount.brand} logo`} className="max-w-1/3 max-h-1/3 object-contain" />
      </div>
      <div className="p-2">
        <p className="text-xs" style={{ color: discount.textColor }}>{discount.condition}</p>
      </div>
      <button 
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-none font-semibold hover:bg-purple-700 transition-colors"
        onClick={() => addToCart(discount)}
      >
        Ajouter au panier
      </button>
    </div>
  );
};
