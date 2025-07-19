import { allGames, availableFilters, delay } from "@/utils/endpoint";

const ITEMS_PER_PAGE = 12;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  let page = parseInt(searchParams.get("page") ?? "1");

  let filteredGames = allGames;

  if (genre) {
    filteredGames = filteredGames.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  if (page < 1 || isNaN(page)) page = 1;

  await delay(2000);

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const fromIndex = (page - 1) * ITEMS_PER_PAGE;
  const toIndex = page * ITEMS_PER_PAGE;
  const games = filteredGames.slice(fromIndex, toIndex);

  const currentPage = page;

  return Response.json({ games, availableFilters, totalPages, currentPage });
}
