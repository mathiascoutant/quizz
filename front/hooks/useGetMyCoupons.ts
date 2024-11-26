import couponsService from '@/services/coupons.service';
import { useSessionStore } from '@/store/session.store';
import { useQuery } from '@tanstack/react-query';

export const useGetMyCoupons = () => {
  const session = useSessionStore((state) => state.session);

  const query = useQuery({
    queryKey: ['my-coupons', session?.user?.id],
    queryFn: async () => {
      if (!session) return;
      return await couponsService.GETSELF(session.user.id);
    },
    enabled: !!session,
  });

  return {
    ...query,
  };
};
