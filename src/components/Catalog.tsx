import { Game } from '@/utils/endpoint';
import GameGrid from './GameGrid';

async function fetchGames(genre?: string, page: number = 1) {
  const searchParams = new URLSearchParams();
  if (genre) searchParams.append('genre', genre);
  searchParams.append('page', page.toString());
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/games?${searchParams}`, {
    cache: 'no-store', // Disable caching for demo purposes due to the delay
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }
  
  return response.json();
}

interface CatalogProps {
  genre?: string;
  page?: number;
}

export default async function Catalog({ genre, page = 1 }: CatalogProps) {
  const data = await fetchGames(genre, page);
  const { games, availableFilters, totalPages, currentPage } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Game Catalog</h1>
        <p className="text-gray-600">Discover amazing games for every taste</p>
      </div>

      {/* Genre Filter */}
      <div className="mb-6">
        <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Genre:
        </label>
        <select
          id="genre-filter"
          defaultValue={genre || ""}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Genres</option>
          {availableFilters.map((filter: string) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>

      {/* Games Grid */}
      <GameGrid games={games} />

      {/* Pagination Info */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Page {currentPage} of {totalPages} • Showing {games.length} games
        </p>
        {currentPage < totalPages && (
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            See More
          </button>
        )}
      </div>
    </div>
  );
}
