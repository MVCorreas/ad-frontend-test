"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Game, allGames } from "@/utils/endpoint";
import GamesGrid from "./GamesGrid";

const ITEMS_PER_PAGE = 12;

interface GamesCatalogProps {
  initialGames: Game[];
  availableFilters: string[];
}

export default function GamesCatalog({
  initialGames,
  availableFilters,
}: GamesCatalogProps) {
  const searchParams = useSearchParams();
  const currentGenre = searchParams.get("genre");

  const [displayedGames, setDisplayedGames] = useState<Game[]>(initialGames);
  const [currentLoadedPage, setCurrentLoadedPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getFilteredGames = () => {
    if (!currentGenre) return allGames;
    return allGames.filter(
      (game) => game.genre.toLowerCase() === currentGenre.toLowerCase()
    );
  };

  useEffect(() => {
    const filteredGames = currentGenre
      ? allGames.filter(
          (game) => game.genre.toLowerCase() === currentGenre.toLowerCase()
        )
      : allGames;
    const firstPageGames = filteredGames.slice(0, ITEMS_PER_PAGE);
    setDisplayedGames(firstPageGames);
    setCurrentLoadedPage(1);
  }, [currentGenre]);

  const loadMoreGames = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const filteredGames = getFilteredGames();
    const nextPage = currentLoadedPage + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = nextPage * ITEMS_PER_PAGE;
    const newGames = filteredGames.slice(startIndex, endIndex);

    setDisplayedGames((prev) => [...prev, ...newGames]);
    setCurrentLoadedPage(nextPage);
    setIsLoading(false);
  };

  const loadLessGames = () => {
    const newGames = displayedGames.slice(0, -ITEMS_PER_PAGE);
    setDisplayedGames(newGames);
    setCurrentLoadedPage((prev) => prev - 1);
  };

  const filteredGames = getFilteredGames();
  const totalGamesAvailable = filteredGames.length;
  const canLoadMore = displayedGames.length < totalGamesAvailable;
  const canLoadLess = currentLoadedPage > 1;

  return (
    <GamesGrid
      games={displayedGames}
      canLoadMore={canLoadMore}
      canLoadLess={canLoadLess}
      onLoadMore={loadMoreGames}
      onLoadLess={loadLessGames}
      isLoading={isLoading}
      totalGamesShown={displayedGames.length}
      totalGamesAvailable={totalGamesAvailable}
    />
  );
}
