import React, { useContext } from "react";
import Layout from "../layout/Layout";
import ProductCard from "../components/ProductCard";
import SelectMenu from "../components/SelectMenu";
import {
  sortCategoryOptions,
  sortNameOptions,
  sortPriceOptions,
  testProduct,
} from "../constants/data";
import { FavoriteContext } from "../context/FavoriteContext";

const Favorite = () => {
  const { state } = useContext(FavoriteContext);
  return (
    <div>
      <Layout>
        {/* Sort Option List */}
        <div className="md:flex justify-end m-10 gap-5 grid grid-cols-2">
          <SelectMenu options={sortPriceOptions} defaultOption="Price" />
          <SelectMenu options={sortNameOptions} defaultOption="Name" />
          <SelectMenu options={sortCategoryOptions} defaultOption="Category" />
        </div>

        {/* Favorite List  */}
        <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
          {state.favoriteList.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Favorite;
