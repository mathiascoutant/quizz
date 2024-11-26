import { api, constructUrl } from './api.service';

type CategoryCompletion = {
  answeredQuestions: number;
  id: number;
  totalQuestions: number;
  percentage: number;
  name: string;
};

export type Stats = {
  global: GlobalStats;
  categoryStats: {
    userId: string;
    answersByCategory: {
      categoryId: number;
      categoryName: string;
      totalAnswers: number;
      correctAnswers: string;
      correctPercentage: string;
      incorrectAnswers: string;
      incorrectPercentage: string;
    }[];
  };
};

type GlobalStats = {
  correctPercentage: string;
  incorrectPercentage: string;
  totalAnswers: number;
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

const getUserStats = async (userId: string) => {
  const response = await api(`/useranswers/stats/${userId}`);

  if (!response.ok) {
    throw new Error('Error fetching user stats');
  }

  return (await response.json()) as GlobalStats;
};

const getUserStatsByCategories = async (userId: string) => {
  const response = await api(`/useranswers/statsByCategory/${userId}`);

  if (!response.ok) {
    throw new Error('Error fetching user stats by categories');
  }

  return (await response.json()) as Stats['categoryStats'];
};

const StatsService = {
  getStatsByCategories,
  getCategoryCompletion,
  getUserStats,
  getUserStatsByCategories,
};
export default StatsService;
