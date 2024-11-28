import { api } from './api.service';

export interface Badge {
  id: string;
  name: string;
  description: string;
  urlImage: string;
  conditionValue: number;
}

const GET = async () => {
  const response = await api('/badges/all');

  if (!response.ok) {
    throw new Error('Error fetching categories');
  }

  return (await response.json()) as Badge[];
};

const badgesService = {
  GET,
};

export default badgesService;
