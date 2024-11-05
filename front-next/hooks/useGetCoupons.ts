import couponsService from '@/services/coupons.service';
import { useQuery } from '@tanstack/react-query';

export const useGetCoupons = () => {
  const query = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      return await couponsService.GET();
    },
    staleTime: Infinity,
  });

  return {
    ...query,
  };
};
