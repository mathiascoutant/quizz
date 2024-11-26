import rankingService from "@/services/ranking.service";
import { useQuery } from "@tanstack/react-query";

export const useGetRanking = () => {
  const query = useQuery({
    queryKey: ["ranking"],
    queryFn: async () => {
      return await rankingService.GET();
    },
    staleTime: Infinity,
  });

  return {
    ...query,
  };
};
