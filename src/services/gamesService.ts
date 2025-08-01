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
    // Server-side
    // For production, use your production domain
    if (process.env.VERCEL_ENV === "production") {
      return "https://apply-digital-frontend-test-seven.vercel.app";
    }
    // For preview/development, use VERCEL_URL
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  }
  // Client-side - use relative URLs
  return "";
};

const apiCall = async (path: string): Promise<GamesApiResponse> => {
  const baseURL = getBaseURL();
  const url = baseURL ? `${baseURL}${path}` : path;

  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (resp.ok) {
      return await resp.json();
    } else {
      // If API call fails, return empty data structure
      console.warn(`API call failed: ${resp.status} ${resp.statusText}`);
      return {
        games: [],
        availableFilters: [],
        totalPages: 0,
        currentPage: 1
      };
    }
  } catch (error) {
    // If fetch fails completely (e.g., during build), return empty data
    console.warn('API call failed:', error);
    return {
      games: [],
      availableFilters: [],
      totalPages: 0,
      currentPage: 1
    };
  }
};

export const gamesService = {
  async getGames(genre?: string, page: number = 1): Promise<GamesApiResponse> {
    const params = new URLSearchParams();

    if (genre) {
      params.set("genre", genre);
    }

    params.set("page", page.toString());

    return await apiCall(`/api/games?${params.toString()}`);
  },
};
