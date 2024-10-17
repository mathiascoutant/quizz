export const DiscountList = ({ discounts }) => {
  return (
    <div>
      {discounts.length > 0 ? (
        <div className="grid grid-cols-5 gap-8">
          {discounts.map((discount) => (
            <DiscountItem key={discount.id} discount={discount} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full">
          <h2 className="text-3xl text-center font-bold">Aucun résultat</h2>
        </div>
      )}
    </div>
  );
};

const DiscountItem = ({ discount }) => {
  return (
    <div>
      <img src={discount.image} alt="Coupon" />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{discount.title}</h3>
      </div>
    </div>
  );
};
