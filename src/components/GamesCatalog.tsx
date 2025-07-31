"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Game, gamesService } from "@/services/gamesService";
import GamesGrid from "./GamesGrid";
import LoadingScreen from "./LoadingScreen";

interface GamesCatalogProps {
  availableFilters: string[];
}

export default function GamesCatalog({ availableFilters }: GamesCatalogProps) {
  const searchParams = useSearchParams();
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const genre = searchParams.get("genre") || undefined;

  useEffect(() => {
    setIsInitialLoading(true);
    setAllGames([]);
    setCurrentPage(1);

    gamesService
      .getGames(genre, 1)
      .then((data) => {
        setAllGames(data.games);
        setCurrentPage(1);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error("Error loading games:", error);
      })
      .finally(() => {
        setIsInitialLoading(false);
      });
  }, [genre]);

  const handleLoadMore = () => {
    if (isLoading || currentPage >= totalPages) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;

    gamesService
      .getGames(genre, nextPage)
      .then((data) => {
        setAllGames((prev) => [...prev, ...data.games]);
        setCurrentPage(nextPage);
      })
      .catch((error) => {
        console.error("Error loading more games:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  const canLoadMore = currentPage < totalPages;

  return (
    <GamesGrid
      games={allGames}
      canLoadMore={canLoadMore}
      canLoadLess={false}
      onLoadMore={handleLoadMore}
      isLoading={isLoading}
      totalGamesShown={allGames.length}
      totalGamesAvailable={totalPages * 12}
    />
  );
}
