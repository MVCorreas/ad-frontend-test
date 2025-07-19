import { FiChevronDown } from "react-icons/fi";

interface CatalogHeaderProps {
  availableFilters: string[];
  genre?: string;
}

export default function CatalogHeader({
  availableFilters,
  genre,
}: CatalogHeaderProps) {
  return (
    <div className="border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Top Sellers</h1>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            <span className="text-colour-primary text-sm font-bold">Genre</span>
            <span className="text-colour-primary">|</span>
            <div className="relative">
              <select
                id="genre-filter"
                defaultValue={genre || ""}
                className="appearance-none bg-transparent border-none px-2 py-1 pr-6 text-sm text-colour-primary focus:outline-none cursor-pointer"
              >
                <option value="">All</option>
                {availableFilters.map((filter: string) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                <FiChevronDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
