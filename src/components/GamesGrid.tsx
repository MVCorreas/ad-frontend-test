import { Game } from '@/utils/endpoint';
import GameCard from './GameCard';

interface GamesGridProps {
  games: Game[];
  currentPage: number;
  totalPages: number;
}

export default function GamesGrid({ games, currentPage, totalPages }: GamesGridProps) {
  return (
    <div className='bg-white'>
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
