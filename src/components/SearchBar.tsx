"use client";

import { FiChevronDown } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  availableFilters: string[];
}

export default function SearchBar({ availableFilters }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGenre = searchParams.get("genre") || "";

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (selectedGenre) {
      params.set("genre", selectedGenre);
    } else {
      params.delete("genre");
    }

    params.delete("page");

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-colour-tertiary text-sm font-medium">Genre</span>
      <span className="text-colour-tertiary">|</span>
      <div className="relative">
        <select
          id="genre-filter"
          value={currentGenre}
          onChange={handleGenreChange}
          className="appearance-none bg-transparent border-none px-2 py-1 pr-6 text-sm text-colour-secondary focus:outline-none cursor-pointer"
        >
          <option value="">All</option>
          {availableFilters.map((filter: string) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
          <FiChevronDown className="w-3 h-3 text-colour-tertiary" />
        </div>
      </div>
    </div>
  );
}
