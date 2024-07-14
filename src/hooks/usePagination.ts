import { useMemo } from "react";
import { ITEMS_PER_PAGE } from "../types/constants";

const usePagination = <T>(items: T[], pageNumber: number) => {
  const paginatedItems = useMemo(() => {
    const validPageNumber = Math.max(1, pageNumber); // page should start at 1
    const startIndex = (validPageNumber - 1) * ITEMS_PER_PAGE;
    const validStartIndex = Math.min(startIndex, items.length - 1); // startIndex is within items.
    const endIndex = validStartIndex + ITEMS_PER_PAGE;
    return items.slice(validStartIndex, endIndex);
  }, [items, pageNumber]);

  return paginatedItems;
};

export default usePagination;
