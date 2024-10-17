import { useEffect, useState } from 'react';
import { DISCOUNTS } from '../../constants/[DEV].discounts.constants';

export const DiscountSearch = ({ setDiscounts }) => {
  const [search, setSearch] = useState(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search) {
      setDiscounts(
        DISCOUNTS.filter((discount) =>
          discount.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setDiscounts(DISCOUNTS);
    }
  }, [search, setDiscounts]);

  return (
    <input
      type="text"
      placeholder="Rechercher un bon"
      onChange={handleChange}
    />
  );
};
