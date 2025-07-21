import CatalogHeader from "@/components/CatalogHeader";
import GamesGrid from "@/components/GamesGrid";
import Footer from "@/components/Footer";
import { allGames, availableFilters, delay } from "@/utils/endpoint";

const ITEMS_PER_PAGE = 12;

async function fetchGames(genre?: string, page: number = 1) {
  // Simulate the API logic directly
  let filteredGames = allGames;

  if (genre) {
    filteredGames = filteredGames.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  if (page < 1 || isNaN(page)) page = 1;

  // Mock delay like in the API
  await delay(100); // Reduced delay for development

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const fromIndex = (page - 1) * ITEMS_PER_PAGE;
  const toIndex = page * ITEMS_PER_PAGE;
  const games = filteredGames.slice(fromIndex, toIndex);

  const currentPage = page;

  return { games, availableFilters, totalPages, currentPage };
}

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

  const data = await fetchGames(genre, page);
  const { games, availableFilters, totalPages, currentPage } = data;

  return (
    <>
      <div className="min-h-screen bg-white">
        <CatalogHeader availableFilters={availableFilters} />
        <GamesGrid
          games={games}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
