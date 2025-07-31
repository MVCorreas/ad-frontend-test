import { Game } from "@/services/gamesService";
import GameCard from "./GameCard";
import Pagination from "./Pagination";

interface GamesGridProps {
  games: Game[];
  canLoadMore: boolean;
  canLoadLess: boolean;
  onLoadMore: () => void;
  onGoBack: () => void;
  isLoading?: boolean;
  totalGamesShown: number;
  totalGamesAvailable: number;
}

export default function GamesGrid({
  games,
  canLoadMore,
  canLoadLess,
  onLoadMore,
  onGoBack,
  isLoading = false,
  totalGamesShown,
  totalGamesAvailable,
}: GamesGridProps) {
  return (
    <div className="bg-white">
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

        <Pagination
          totalShown={totalGamesShown}
          totalAvailable={totalGamesAvailable}
          canLoadMore={canLoadMore}
          canLoadLess={canLoadLess}
          onLoadMore={onLoadMore}
          onGoBack={onGoBack}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}