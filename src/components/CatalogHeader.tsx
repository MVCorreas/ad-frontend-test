import { Suspense } from "react";
import SearchBar from "./SearchBar";

interface CatalogHeaderProps {
  availableFilters: string[];
}

export default function CatalogHeader({
  availableFilters,
}: CatalogHeaderProps) {
  return (
    <div className="border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start">
          <div>
            <h1 className="text-2xl font-bold text-colour-primary">
              Top Sellers
            </h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-end">
          <Suspense fallback={<div className="text-gray-500">Loading filters...</div>}>
            <SearchBar availableFilters={availableFilters} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
