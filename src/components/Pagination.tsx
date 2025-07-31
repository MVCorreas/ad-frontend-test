import Button from "./Button";

interface PaginationProps {
  canLoadMore: boolean;
  canLoadLess: boolean;
  onLoadMore: () => void;
  isLoading?: boolean;
}

export default function Pagination({
  canLoadMore,
  onLoadMore,
  isLoading = false,
}: PaginationProps) {
  return (
    <div className="mt-12 text-center">
      <div className="flex justify-center gap-4">
        {canLoadMore && (
          <Button
            text={"SEE MORE"}
            onClick={onLoadMore}
            variant="secondary"
            size="small"
          />
        )}
      </div>
    </div>
  );
}
