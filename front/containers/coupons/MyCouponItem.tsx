import { Coupon } from '@/services/coupons.service';

export const MyCouponItem = ({ coupon }: { coupon: Coupon }) => {
  return (
    <div>
      <div
        style={{
          backgroundColor: coupon.color,
          position: 'relative',
          transition: 'transform 0.2s',
        }}
        className={`max-w-1/3 h-40 rounded-lg flex flex-col justify-between items-start`}
      >
        <div className="flex flex-col w-full h-full justify-between">
          <div className="flex justify-end">
            <strong className="pr-3 pt-2 text-lg" style={{ color: 'white' }}>
              -{coupon.cashReduction ? `${coupon.cashReduction} €` : `${coupon.percentReduction}%`}
            </strong>
          </div>
          <p className={`text-white text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-grow`}>
            {coupon.brand}
          </p>
          <div className="flex">
            <p className="pl-2 pb-1 text-xs italic" style={{ color: 'white' }}>
              * {coupon.specificContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 