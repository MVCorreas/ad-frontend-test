import CatalogHeader from "@/components/CatalogHeader";
import GamesCatalog from "@/components/GamesCatalog";
import { gamesService } from "@/services/gamesService";

interface SearchParams {
  genre?: string;
  page?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const genre = searchParams.genre;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  try {
    const { games, availableFilters, totalPages, currentPage } = await gamesService.getGames(genre, page);

    return (
      <>
        <div className="min-h-screen bg-white">
          <CatalogHeader availableFilters={availableFilters} />
          <GamesCatalog
            games={games}
            currentPage={currentPage}
            totalPages={totalPages}
            availableFilters={availableFilters}
          />
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading games:', error);
    
    // Fallback UI in case of API error
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error loading games
          </h1>
          <p className="text-gray-600">
            There was a problem loading the games. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
