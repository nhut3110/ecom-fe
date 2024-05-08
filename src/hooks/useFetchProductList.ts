import { useEffect, useState } from "react";
import {
  FilterOptionType,
  ProductDetails,
  SortOptionType,
  PAGE_LIMIT,
} from "../constants";
import { determineSortDirections } from "../utils";
import { FindProductType, PaginatedResponse } from "../services";

type UseFetchProductListType = {
  selectedSort?: SortOptionType;
  selectedFilter?: FilterOptionType;
  limit?: number;
  queryFn: (params: FindProductType) => Promise<PaginatedResponse>;
};

export const useFetchProductList = ({
  selectedSort,
  selectedFilter,
  queryFn,
  limit,
}: UseFetchProductListType) => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string | undefined>();
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const fetchList = async (
    sortOptions?: SortOptionType,
    filterOptions?: FilterOptionType,
    cursor?: string
  ) => {
    setIsLoading(true);

    const productListData = await queryFn({
      limit,
      cursor,
      ...sortOptions,
      ...filterOptions,
    });

    setIsLoading(false);
    setProducts((products) => [...products, ...productListData.data]);
    if (!cursor) setTotalRecords(productListData.pagination.total);
    setCursor(productListData.pagination.nextCursor);
  };

  useEffect(() => {
    const sortOptions = determineSortDirections(selectedSort);
    const filterOptions = selectedFilter ? selectedFilter : {};
    setCursor(() => undefined);
    setProducts([]);

    fetchList(sortOptions, filterOptions, undefined);
  }, [selectedSort, selectedFilter]);

  return { products, isLoading, cursor, totalRecords, fetchList };
};
