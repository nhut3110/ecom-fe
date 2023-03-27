import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductDetails } from "../constants/data";
import { FavoriteContext } from "../context/FavoriteContext";
import HeartButton from "./HeartButton";
import RatingStar from "./RatingStar";
import SmallButton from "./SmallButton";

const ProductCard = (props: {
  product: ProductDetails;
}): React.ReactElement => {
  const { product } = props;
  const { state, addFavorite, removeFavorite } = useContext(FavoriteContext);
  const [love, setLove] = useState(state.favoriteList.includes(product));

  const [integerPart, decimalPart] = product.price.toString().split(".");
  const handleFavorites = () => {
    love ? removeFavorite(product) : addFavorite(product);
    setLove(!love);
  };
  return (
    <div className="flex w-80 flex-col items-center justify-center gap-1 rounded-lg border-[1px] border-solid border-black bg-white p-2">
      <div className="relative flex aspect-square w-60 items-center justify-center ">
        <Link to="/product/test">
          <img
            src={product.image}
            alt={product.title}
            className=" h-36 object-cover"
          />
        </Link>

        <HeartButton
          love={love}
          className="absolute top-2 -right-2"
          onClick={handleFavorites}
        />
      </div>

      <div className="flex w-full justify-between px-2">
        <div className="flex w-[75%] flex-col ">
          <Link to="/product/test">
            <p className="truncate text-lg font-semibold">{product.title}</p>
          </Link>

          <p className="truncate text-sm text-gray-500">
            {product.description}
          </p>
        </div>

        <div className="flex items-start justify-end">
          <p className="text-xs font-bold">$</p>
          <p className="text-lg font-bold">{integerPart}</p>
          <p className="text-xs font-bold">
            .{decimalPart ? decimalPart : "00"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 self-start px-1">
        <RatingStar rating={product.rating.rate} />
        <p className="text-sm text-gray-500">({product.rating.count})</p>
      </div>

      <div className="mt-2 w-auto self-start">
        <SmallButton name="Add to Cart" />
      </div>
    </div>
  );
};

export default ProductCard;
