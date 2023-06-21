import times from "lodash/times";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import SmallButton from "../components/SmallButton";
import { getProductList } from "../services/products.api";
import { determineSortDirections, selectSortMenu } from "../utils";
import { ProductDetails } from "../constants";
import { useFetchProductList } from "../hooks/useFetchProductList";

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

  const handleLoadMore = () => {
    const sortOptions = determineSortDirections(selectedSort);
    const filterOptions = selectedFilter ? { categoryId: selectedFilter } : {};

    fetchList(sortOptions, filterOptions, cursor);
  };

  const renderSkeletonList = () => (
    <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
      {times(DEFAULT_QUANTITY_PRODUCT_SKELETON, (index) => (
        <OpacityMotionWrapper key={index}>
          <ProductCardSkeleton />
        </OpacityMotionWrapper>
      ))}
    </div>
  );

  const renderProductList = () => (
    <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
      {products.map((product: ProductDetails) => (
        <OpacityMotionWrapper key={product.id}>
          <ProductCard product={product} key={product.id} />
        </OpacityMotionWrapper>
      ))}
    </div>
  );

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
      {products.length < totalRecords && (
        <div className="my-5 flex w-full items-center justify-center">
          <SmallButton content="Load more" onClick={handleLoadMore} />
        </div>
      )}
    </div>
  );
};

export default Product;
