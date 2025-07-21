"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
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
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
        <Image
          src="/loading-pacman.gif"
          alt="Loading..."
          width={500}
          height={500}
          unoptimized
        />
        <span className="text-colour-primary text-lg font-semibold mt-4">
          Loading GamerShop...
        </span>
      </div>
    );
  }

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
  const totalGamesAvailable = totalPages * 12;

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
