import CatalogHeader from "@/components/CatalogHeader";
import GamesCatalog from "@/components/GamesCatalog";
import { allGames, availableFilters } from "@/utils/endpoint";

const ITEMS_PER_PAGE = 12;

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

  let filteredGames = allGames;
  if (genre) {
    filteredGames = filteredGames.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const fromIndex = (page - 1) * ITEMS_PER_PAGE;
  const toIndex = page * ITEMS_PER_PAGE;
  const games = filteredGames.slice(fromIndex, toIndex);

  return (
    <>
      <div className="min-h-screen bg-white">
        <CatalogHeader availableFilters={availableFilters} />
        <GamesCatalog
          games={games}
          currentPage={page}
          totalPages={totalPages}
          availableFilters={availableFilters}
        />
      </div>
    </>
  );
}
