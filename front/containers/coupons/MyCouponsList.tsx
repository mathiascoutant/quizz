'use client';

import { Skeleton } from '@/components/common/Skeleton';
import { useGetMyCoupons } from '@/hooks/useGetMyCoupons';
import { useState } from 'react';
import { CouponItem } from './CouponItem';

export const MyCouponsList = () => {
    const { data: coupons, isLoading } = useGetMyCoupons();
    const [showUnavailable, setShowUnavailable] = useState(false);

    const handleToggle = () => {
        setShowUnavailable(!showUnavailable);
    };

    if (isLoading || !coupons)
        return (
            <div className="bg-purple-100 py-16">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Mes coupons
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} className="w-full h-[186px] rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        );

    return (
        <div className="bg-purple-100 py-16">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Mes coupons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coupons.map((coupon) => (
                        <CouponItem
                            key={coupon.id}
                            coupon={coupon.coupon}
                            unavailable={false}
                            quantity={coupon.quantity}
                            discountCode={coupon.discountCode}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}; 