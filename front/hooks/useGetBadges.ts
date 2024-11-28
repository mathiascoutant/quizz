import badgesService from '@/services/bades.service';
import { useQuery } from '@tanstack/react-query';

export const useGetBadges = () => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await badgesService.GET();
    },
  });

  return {
    ...query,
  };
};
