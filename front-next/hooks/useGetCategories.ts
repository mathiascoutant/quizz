import { Category } from '@/containers/home/Categories';
import categoriesService from '@/services/categories.service';
import { getCategoryIcon } from '@/utils/getCategoryIcon';
import { useQuery } from '@tanstack/react-query';

const processCategories = (categories: Category[]) => {
  return categories.map((category) => ({
    id: category.id,
    icon: getCategoryIcon(category.name).icon,
    name: category.name,
    shortDescription: category.shortDescription,
    longDescription: category.longDescription,
  }));
};

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await categoriesService.GET();
    },
    staleTime: Infinity,
  });

  if (!query.data) return { ...query, data: [] };

  return {
    ...query,
    data: processCategories(query.data),
  };
};
