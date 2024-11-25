import difficultiesService from '@/services/difficulties.service';
import { useQuery } from '@tanstack/react-query';

export const useGetDifficulties = () => {
  const query = useQuery({
    queryKey: ['categories', 'difficulties'],
    queryFn: async () => {
      return await difficultiesService.GET();
    },
    staleTime: Infinity,
  });

  return {
    ...query,
  };
};
