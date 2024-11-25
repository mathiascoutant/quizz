import { api, constructUrl } from './api.service';

type CategoryCompletion = {
  answeredQuestions: number;
  id: number;
  totalQuestions: number;
  percentage: number;
  name: string;
};

const getStatsByCategories = async (userId: string) => {
  const response = await fetch(
    constructUrl(`/useranswers/statsbyCategory/${userId}`)
  );

  if (!response.ok) {
    throw new Error('Error fetching stats');
  }

  return await response.json();
};

const getCategoryCompletion = async (userId: string) => {
  const response = await api(`/categories/percentage/${userId}`);

  if (!response.ok) {
    throw new Error('Error fetching category completion');
  }

  return (await response.json()) as CategoryCompletion[];
};

const StatsService = {
  getStatsByCategories,
  getCategoryCompletion,
};
export default StatsService;
