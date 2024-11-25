import { constructUrl } from './api.service';

export interface Difficulty {
  id: number;
  difficulty: string;
}

const GET = async () => {
  const response = await fetch(constructUrl('/levels'));

  if (!response.ok) {
    throw new Error('Error fetching difficulties');
  }

  return (await response.json()) as Difficulty[];
};

const difficultiesService = {
  GET,
};

export default difficultiesService;
