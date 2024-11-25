import StatsService from '@/services/stats.service';
import { useSessionStore } from '@/store/session.store';
import { useQuery } from '@tanstack/react-query';

export const useGetCategoriesCompletion = () => {
  const session = useSessionStore((s) => s.session);

  const query = useQuery({
    queryKey: ['categoriesCompletion'],
    queryFn: async () => {
      if (!session) return;
      return await StatsService.getCategoryCompletion(session.user.id);
    },
    enabled: !!session,
  });

  return {
    ...query,
  };
};
