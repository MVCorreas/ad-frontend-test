"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Game } from "@/utils/endpoint";
import GamesGrid from "./GamesGrid";

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

  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", (currentPage + 1).toString());
    router.push(`/?${params.toString()}`);
  };

  const handleLoadLess = () => {
    const params = new URLSearchParams(searchParams);
    if (currentPage > 2) {
      params.set("page", (currentPage - 1).toString());
    } else {
      params.delete("page");
    }
    router.push(`/?${params.toString()}`);
  };

  const canLoadMore = currentPage < totalPages;
  const canLoadLess = currentPage > 1;
  const totalGamesShown = games.length;
  const totalGamesAvailable = totalPages * 12; // Approximate

  return (
    <GamesGrid
      games={games}
      canLoadMore={canLoadMore}
      canLoadLess={canLoadLess}
      onLoadMore={handleLoadMore}
      onGoBack={handleLoadLess}
      isLoading={false}
      totalGamesShown={totalGamesShown}
      totalGamesAvailable={totalGamesAvailable}
    />
  );
}
