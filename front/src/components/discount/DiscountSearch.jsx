import { useEffect, useState } from 'react';
import { discountsData } from './DiscountList'; // Import discountsData instead of DiscountList
import { FaSearch } from 'react-icons/fa';

export const DiscountSearch = ({ setDiscounts }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search) {
      const filteredDiscounts = discountsData.filter((discount) =>
        discount.brand.toLowerCase().includes(search.toLowerCase())
      );
      setDiscounts(filteredDiscounts);
    } else {
      setDiscounts(discountsData);
    }
  }, [search, setDiscounts]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="relative max-w-md mx-auto mt-8 mb-4">
      <input
        type="text"
        placeholder="Rechercher un bon"
        onChange={handleChange}
        className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-full outline-none border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FaSearch className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};
