import axios from 'axios';

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
      params.set('genre', genre);
    }
    
    if (page > 1) {
      params.set('page', page.toString());
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/games${params.toString() ? `?${params.toString()}` : ''}`;
    
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching games:', error);
      throw error;
    });
  },
};
