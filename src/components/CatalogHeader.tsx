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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-colour-primary">Top Sellers</h1>
          </div>

          <div className="mt-4 sm:mt-0">
            <SearchBar availableFilters={availableFilters} />
          </div>
        </div>
      </div>
    </div>
  );
}
