import CatalogHeader from "@/components/CatalogHeader";
import GamesCatalog from "@/components/GamesCatalog";
import { gamesService } from "@/services/gamesService";
import { Suspense } from "react";

export default async function Home() {
  try {
    const { availableFilters } = await gamesService.getGames();

    return (
      <>
        <div className="min-h-screen bg-white">
          <CatalogHeader availableFilters={availableFilters} />
          <Suspense fallback={<div className="flex justify-center items-center py-8"><div className="text-gray-500">Loading games...</div></div>}>
            <GamesCatalog availableFilters={availableFilters} />
          </Suspense>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error loading initial data:", error);

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error loading games
          </h1>
          <p className="text-gray-600">
            There was a problem loading the games. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
