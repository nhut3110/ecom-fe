import times from "lodash/times";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useSortAndFilterProduct } from "../hooks/useSortAndFilterProduct";
import Carousel from "../components/Carousel";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import { ProductDetails } from "../constants/data";
import { selectSortMenu } from "../utils/SelectSortMenu";
import { fetchProducts } from "../services/api";

const DEFAULT_QUANTITY_PRODUCT_SKELETON = 20; // Number of products skeletons in the loading screen

const Product = (): React.ReactElement => {
  const { products, isLoading } = fetchProducts();
  const { renderSelectSortMenu, selectedSort, selectedFilter } =
    selectSortMenu();

  const { filteredProducts } = useSortAndFilterProduct({
    products,
    selectedSort,
    selectedFilter,
  });

  const renderSkeletonList = () => {
    return (
      <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        {times(DEFAULT_QUANTITY_PRODUCT_SKELETON, (index) => (
          <OpacityMotionWrapper key={index}>
            <ProductCardSkeleton />
          </OpacityMotionWrapper>
        ))}
      </div>
    );
  };

  const renderProductList = () => {
    return (
      <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        {filteredProducts.map((product: ProductDetails) => (
          <OpacityMotionWrapper key={product.id}>
            <ProductCard product={product} key={product.id} />
          </OpacityMotionWrapper>
        ))}
      </div>
    );
  };

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
    </div>
  );
};

export default Product;
