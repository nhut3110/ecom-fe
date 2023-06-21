import { SortOptionType } from "../constants";

enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}

const SORT_ASCENDING = "Ascending";

export const determineSortDirections = (sortOption?: SortOptionType) => {
  if (!sortOption) return undefined;

  const { sortBy, sortDirection } = sortOption;

  if (sortBy == sortDirection) return undefined;

  return {
    sortBy,
    sortDirection:
      sortDirection === SORT_ASCENDING ? SortType.ASC : SortType.DESC,
  };
};
