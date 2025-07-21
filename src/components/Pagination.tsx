import Button from "./Button";

interface PaginationProps {
  totalShown: number;
  totalAvailable: number;
  canLoadMore: boolean;
  canLoadLess: boolean;
  onLoadMore: () => void;
  onLoadLess: () => void;
  isLoading?: boolean;
}

export default function Pagination({
  totalShown,
  totalAvailable,
  canLoadMore,
  canLoadLess,
  onLoadMore,
  onLoadLess,
  isLoading = false,
}: PaginationProps) {
  return (
    <div className="mt-12 text-center">
      <p className="text-gray-500 text-sm mb-4">
        Showing {totalShown} of {totalAvailable} games
      </p>
      
      <div className="flex justify-center gap-4">
        {canLoadLess && (
          <Button
            text="Show Less"
            onClick={onLoadLess}
            variant="secondary"
            size="small"
          />
        )}
        {canLoadMore && (
          <Button
            text={isLoading ? "Loading..." : "See More"}
            onClick={onLoadMore}
            variant="secondary"
            size="small"
          />
        )}
      </div>
    </div>
  );
}
