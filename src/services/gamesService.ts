import axios from "axios";

export interface Game {
  id: string;
  genre: string;
  image: string;
  name: string;
  description: string;
  price: number;
  isNew: boolean;
}

export interface GamesApiResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

export const gamesService = {
  getGames(genre?: string, page: number = 1): Promise<GamesApiResponse> {
    const params = new URLSearchParams();

    if (genre) {
      params.set("genre", genre);
    }

    params.set("page", page.toString());

    const baseUrl =
      typeof window === "undefined"
        ? `${process.env.NEXT_PUBLIC_BASE_URL}`
        : "";

    const url = `${baseUrl}/api/games?${params.toString()}`;

    return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        throw error;
      });
  },
};
