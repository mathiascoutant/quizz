import React, { useState } from 'react';
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

  return (
    <div>
      <DiscountSearch setDiscounts={setFilteredDiscounts} />
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filteredDiscounts.map((discount) => (
            <DiscountItem key={discount.id} discount={discount} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DiscountItem = ({ discount }) => {
  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-lg h-64 flex flex-col justify-between w-full"
      style={{ backgroundColor: discount.backgroundColor }}
    >
      <div className="absolute top-2 right-2 text-2xl font-bold" style={{ color: discount.textColor }}>
        {discount.discount}
      </div>
      <div className="flex-grow flex items-center justify-center p-4">
        <img src={discount.logo} alt={`${discount.brand} logo`} className="max-w-1/4 max-h-1/4 object-contain" />
      </div>
      <div className="p-4">
        <p className="text-xs" style={{ color: discount.textColor }}>{discount.condition}</p>
      </div>
      <button 
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-none font-semibold hover:bg-purple-700 transition-colors"
      >
        Choisir
      </button>
    </div>
  );
};
