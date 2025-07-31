"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Game, gamesService } from "@/services/gamesService";
import GamesGrid from "./GamesGrid";
import LoadingScreen from "./LoadingScreen";
import Spinner from "./Spinner";

interface GamesCatalogProps {
  availableFilters: string[];
}

export default function GamesCatalog({ availableFilters }: GamesCatalogProps) {
  const searchParams = useSearchParams();
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const genre = searchParams.get("genre") || undefined;

  useEffect(() => {
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
        setIsInitialLoad(false);
      });
  }, [genre]);

  const handleLoadMore = () => {
    if (isLoadingMore || currentPage >= totalPages) return;

    setIsLoadingMore(true);
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
        setIsLoadingMore(false);
      });
  };

  // Show loading screen only on very first mount
  if (isInitialLoad) {
    return <LoadingScreen />;
  }

  // Show spinner during genre changes (after initial load)
  if (allGames.length === 0) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Spinner size="lg" className="py-20" text="Loading games..." />
        </div>
      </div>
    );
  }

  const canLoadMore = currentPage < totalPages;

  return (
    <GamesGrid
      games={allGames}
      canLoadMore={canLoadMore}
      canLoadLess={false}
      onLoadMore={handleLoadMore}
      isLoading={isLoadingMore}
      totalGamesShown={allGames.length}
      totalGamesAvailable={totalPages * 12}
    />
  );
}
