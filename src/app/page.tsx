import CatalogHeader from "@/components/CatalogHeader";
import GamesCatalog from "@/components/GamesCatalog";
import { allGames, availableFilters } from "@/utils/endpoint";

const ITEMS_PER_PAGE = 12;

interface SearchParams {
  genre?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const genre = searchParams.genre;

  let filteredGames = allGames;
  if (genre) {
    filteredGames = filteredGames.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  const initialGames = filteredGames.slice(0, ITEMS_PER_PAGE);

  return (
    <>
      <div className="min-h-screen bg-white">
        <CatalogHeader availableFilters={availableFilters} />
        <GamesCatalog
          initialGames={initialGames}
          availableFilters={availableFilters}
        />
      </div>
    </>
  );
}
