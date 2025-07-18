import { Game } from '@/utils/endpoint';
import GameCard from './GameCard';

interface GameGridProps {
  games: Game[];
  isLoading?: boolean;
}

export default function GameGrid({ games, isLoading = false }: GameGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Loading games...</span>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No games found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
