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

const getBaseURL = () => {
  if (typeof window === "undefined") {
    if (process.env.VERCEL_ENV === "production") {
      return "https://apply-digital-frontend-test-seven.vercel.app";
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  }
  return "";
};

const apiCall = (path: string): Promise<GamesApiResponse> => {
  const baseURL = getBaseURL();
  const url = baseURL ? `${baseURL}${path}` : path;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(`${resp.status} ${resp.statusText}`);
    })
    .catch(() => ({
      games: [],
      availableFilters: [],
      totalPages: 0,
      currentPage: 1
    }));
};

export const gamesService = {
  getGames(genre?: string, page: number = 1): Promise<GamesApiResponse> {
    const params = new URLSearchParams();
    
    if (genre) params.set("genre", genre);
    params.set("page", page.toString());

    return apiCall(`/api/games?${params.toString()}`);
  },
};
