import { useState } from 'react';
import { DiscountList } from '../components/discount/DiscountList';
import { DiscountSearch } from '../components/discount/DiscountSearch';
import { DISCOUNTS } from '../constants/[DEV].discounts.constants';

function DiscountPage() {
  const [discounts, setDiscounts] = useState(DISCOUNTS);

  return (
    <section className="my-24 max-w-[80%] mx-auto space-y-12">
      <DiscountSearch setDiscounts={setDiscounts} />
      <DiscountList discounts={discounts} />
    </section>
  );
}

export default DiscountPage;
