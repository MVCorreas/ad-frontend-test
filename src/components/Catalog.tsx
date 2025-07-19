import { Game } from '@/utils/endpoint';
import GameCard from './GameCard';

async function fetchGames(genre?: string, page: number = 1) {
  const searchParams = new URLSearchParams();
  if (genre) searchParams.append('genre', genre);
  searchParams.append('page', page.toString());
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/games?${searchParams}`, {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Catalog</h1>
              <p className="mt-1 text-sm text-gray-600">Discover amazing games for every taste</p>
            </div>
            
            {/* Genre Filter */}
            <div className="mt-4 sm:mt-0">
              <label htmlFor="genre-filter" className="sr-only">
                Filter by Genre
              </label>
              <select
                id="genre-filter"
                defaultValue={genre || ""}
                className="block w-full sm:w-48 border border-gray-300 rounded-md px-3 py-2 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">All Genres</option>
                {availableFilters.map((filter: string) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {games.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No games found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game: Game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}

        {/* Pagination Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Page {currentPage} of {totalPages} • Showing {games.length} games
          </p>
          {currentPage < totalPages && (
            <button className="bg-gray-900 text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
              See More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
