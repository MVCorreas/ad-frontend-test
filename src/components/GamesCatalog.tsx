"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Game } from "@/utils/endpoint";
import GamesGrid from "./GamesGrid";
import LoadingScreen from "./LoadingScreen";

interface GamesCatalogProps {
  games: Game[];
  currentPage: number;
  totalPages: number;
  availableFilters: string[];
}

export default function GamesCatalog({
  games,
  currentPage,
  totalPages,
  availableFilters,
}: GamesCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showInitialLoading, setShowInitialLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setShowInitialLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  if (showInitialLoading) {
    return <LoadingScreen />;
  }

  const navigateToPage = (pageNumber: number) => {
    const urlParams = new URLSearchParams(searchParams);
    if (pageNumber > 1) {
      urlParams.set("page", pageNumber.toString());
    } else {
      urlParams.delete("page");
    }
    router.push(`/?${urlParams.toString()}`);
  };

  const handleLoadMore = () => navigateToPage(currentPage + 1);
  const handleGoBack = () => navigateToPage(currentPage - 1);

  const paginationState = {
    canLoadMore: currentPage < totalPages,
    canLoadLess: currentPage > 1,
    totalGamesShown: games.length,
    totalGamesAvailable: totalPages * 12,
  };

  return (
    <GamesGrid
      games={games}
      canLoadMore={paginationState.canLoadMore}
      canLoadLess={paginationState.canLoadLess}
      onLoadMore={handleLoadMore}
      onGoBack={handleGoBack}
      isLoading={false}
      totalGamesShown={paginationState.totalGamesShown}
      totalGamesAvailable={paginationState.totalGamesAvailable}
    />
  );
}
