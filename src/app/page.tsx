import CatalogHeader from "@/components/CatalogHeader";
import GamesGrid from "@/components/GamesGrid";
import Footer from "@/components/Footer";
import axios from "axios";

function fetchGames(genre?: string, page: number = 1) {
  const searchParams = new URLSearchParams();
  if (genre) searchParams.append("genre", genre);
  searchParams.append("page", page.toString());

  return axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/games?${searchParams}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("Failed to fetch games");
    });
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
        <CatalogHeader availableFilters={availableFilters} genre={genre} />
        <GamesGrid
          games={games}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
