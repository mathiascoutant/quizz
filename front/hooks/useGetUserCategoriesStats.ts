import StatsService from '@/services/stats.service';
import { useSessionStore } from '@/store/session.store';
import { useQuery } from '@tanstack/react-query';

export const useGetUserCategoriesStats = () => {
  const session = useSessionStore((state) => state.session);

  const query = useQuery({
    queryKey: ['categoriesStats', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      return await StatsService.getStatsByCategories(session.user.id);
    },
    enabled: !!session?.user?.id,
  });

  return {
    ...query,
  };
};
