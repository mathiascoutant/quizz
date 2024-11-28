import badgesService from '@/services/bades.service';
import { useQuery } from '@tanstack/react-query';

export const useGetBadges = () => {
  const query = useQuery({
    queryKey: ['badges'],
    queryFn: async () => {
      return await badgesService.GET();
    },
  });

  return {
    ...query,
  };
};
