import times from "lodash/times";
import { AnimatePresence } from "framer-motion";
import React, { useCallback } from "react";
import { useFetchProductList } from "../hooks/useFetchProductList";
import Carousel from "../components/Carousel";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import SmallButton from "../components/SmallButton";
import { getProductList } from "../services";
import { determineSortDirections, selectSortMenu } from "../utils";
import { ProductDetails } from "../constants";

const DEFAULT_QUANTITY_PRODUCT_SKELETON = 20; // Number of products skeletons in the loading screen

const Product = (): React.ReactElement => {
  const { renderSelectSortMenu, selectedSort, selectedFilter } =
    selectSortMenu();
  const { products, isLoading, cursor, totalRecords, fetchList } =
    useFetchProductList({
      selectedSort,
      selectedFilter,
      queryFn: getProductList,
    });

  const handleLoadMore = useCallback(() => {
    const sortOptions = determineSortDirections(selectedSort);
    const filterOptions = selectedFilter ? { categoryId: selectedFilter } : {};

    fetchList(sortOptions, filterOptions, cursor);
  }, [selectedSort, selectedFilter, cursor]);

  const renderSkeletonList = useCallback(
    () => (
      <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        {times(DEFAULT_QUANTITY_PRODUCT_SKELETON, (index) => (
          <OpacityMotionWrapper key={index}>
            <ProductCardSkeleton />
          </OpacityMotionWrapper>
        ))}
      </div>
    ),
    []
  );

  const renderProductList = useCallback(
    () => (
      <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        {products.map((product: ProductDetails) => (
          <OpacityMotionWrapper key={product.id}>
            <ProductCard product={product} key={product.id} />
          </OpacityMotionWrapper>
        ))}
      </div>
    ),
    [products]
  );

  const renderLoadMoreButton = useCallback(() => {
    if (products.length < totalRecords)
      return (
        <div className="my-5 flex w-full items-center justify-center">
          <SmallButton content="Load more" onClick={handleLoadMore} />
        </div>
      );
  }, [totalRecords, products.length]);

  return (
    <div className="p-5">
      <Carousel />

      {/* Sort Option List */}
      <div className="m-10 grid grid-cols-2 justify-end gap-5 md:flex">
        {renderSelectSortMenu()}
      </div>

      {/* Product List */}
      <AnimatePresence>
        {isLoading ? renderSkeletonList() : renderProductList()}
      </AnimatePresence>
      {renderLoadMoreButton()}
    </div>
  );
};

export default Product;
