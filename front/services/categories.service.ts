import { Category } from '@/containers/home/Categories';
import { constructUrl } from './api.service';

const GET = async () => {
  const response = await fetch(constructUrl('/categories'));

  if (!response.ok) {
    throw new Error('Error fetching categories');
  }

  return (await response.json()) as Category[];
};

const categoriesService = {
  GET,
};

export default categoriesService;
