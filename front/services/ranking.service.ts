import { constructUrl } from "./api.service";

export interface Ranking {
  pseudo: string;
  score: number;
  rang: number;
}

const GET = async () => {
  const response = await fetch(constructUrl("/classement"));

  if (!response.ok) {
    throw new Error("Error fetching rankings pages");
  }

  return (await response.json()) as Ranking[];
};

const rankingService = {
  GET,
};

export default rankingService;
