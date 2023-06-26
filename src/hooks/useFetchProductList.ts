import { useEffect, useState } from "react";
import {
  FilterOptionType,
  ProductDetails,
  SortOptionType,
  pageLimit,
} from "../constants";
import { determineSortDirections } from "../utils";
import { FindProductType, PaginatedResponse } from "../services";

type UseFetchProductListType = {
  selectedSort?: SortOptionType;
  selectedFilter?: string;
  queryFn: (params: FindProductType) => Promise<PaginatedResponse>;
};

export const useFetchProductList = ({
  selectedSort,
  selectedFilter,
  queryFn,
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
      limit: pageLimit,
      ...sortOptions,
      ...filterOptions,
      cursor,
    });
    setIsLoading(false);
    setProducts((products) => [...products, ...productListData.data]);
    if (!cursor) setTotalRecords(productListData.pagination.total);
    setCursor(productListData.pagination.nextCursor);
  };

  useEffect(() => {
    const sortOptions = determineSortDirections(selectedSort);
    const filterOptions = selectedFilter ? { categoryId: selectedFilter } : {};
    setCursor(() => undefined);
    setProducts([]);

    fetchList(sortOptions, filterOptions, undefined);
  }, [selectedSort, selectedFilter]);

  return { products, isLoading, cursor, totalRecords, fetchList };
};
