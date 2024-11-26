import StatsService from '@/services/stats.service';
import { useSessionStore } from '@/store/session.store';
import { useQuery } from '@tanstack/react-query';

export const useGetUserStats = () => {
  const session = useSessionStore((state) => state.session);
  const query = useQuery({
    queryKey: ['stats', session?.user?.id],
    queryFn: async () => {
      if (!session) return;
      const { id } = session.user;
      return {
        global: await StatsService.getUserStats(id),
        byCategories: await StatsService.getUserStatsByCategories(id),
      };
    },
    enabled: !!session,
  });

  return {
    ...query,
  };
};
