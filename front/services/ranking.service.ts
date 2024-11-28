import { api } from './api.service';

export interface Ranking {
  topUsers: TopUsers[];
  currentUser: {
    coins: number;
    id: number;
    pseudo: string;
    position: number;
  };
}

export interface TopUsers {
  id: number;
  pseudo: string;
  coins: number;
}

const GET = async () => {
  const response = await api('/classement/top-users');

  if (!response.ok) {
    throw new Error('Error fetching rankings pages');
  }

  return (await response.json()) as Ranking;
};

const rankingService = {
  GET,
};

export default rankingService;
