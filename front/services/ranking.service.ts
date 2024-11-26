import { User } from "@/store/session.store";
import { api, constructUrl } from "./api.service";

export interface Ranking {
  topUsers: TopUsers[];
}

export interface TopUsers {
  pseudo: string;
  score: number;
  rang: number;
}

const GET = async () => {
  const response = await api("/classement/top-users");

  if (!response.ok) {
    throw new Error("Error fetching rankings pages");
  }

  return (await response.json()) as Ranking[];
};

const rankingService = {
  GET,
};

export default rankingService;
