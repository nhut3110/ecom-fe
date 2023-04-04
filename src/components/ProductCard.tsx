import React, { useCallback, useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FavoriteContext } from "../context/FavoriteContext";
import HeartButton from "./HeartButton";
import RatingStar from "./RatingStar";
import SmallButton from "./SmallButton";
import { ProductDetails } from "../constants/data";
import { CartContext } from "../context/CartContext";
import { getLocalStorageValue } from "../utils/LocalStorage";
import { NotificationContext } from "../context/NotificationContext";

const DEFAULT_QUANTITY = 1; // default value when user clicks on add to cart

const ProductCard = (props: {
  product: ProductDetails;
}): React.ReactElement => {
  const { product } = props;

  const { notify } = useContext(NotificationContext);
  const { addFavorite, removeFavorite, storeFavorite } =
    useContext(FavoriteContext);
  const { addToCart, calculateCartValue } = useContext(CartContext);

  const isFavorite = useMemo(() => {
    const { favoriteList } = getLocalStorageValue({ key: "favorites" });
    if (favoriteList === undefined) {
      return false;
    }

    return favoriteList.find((item: ProductDetails) => {
      return item.id == product.id;
    });
  }, []);

  const [love, setLove] = useState(isFavorite);

  const handleFavorites = useCallback(() => {
    love ? removeFavorite(product) : addFavorite(product);
    notify({
      content: `Successfully ${love ? "remove from" : "added to"} favorites`,
      type: "favorite",
      isOpen: true,
      id: crypto.randomUUID(),
    });
    storeFavorite();
    setLove(!love);
  }, [love]);

  const [integerPart, decimalPart] = useMemo(() => {
    const [integer, decimal] = product.price.toString().split(".");

    return [integer, decimal];
  }, [product.price]);

  const handleAddToCart = useCallback(() => {
    addToCart(DEFAULT_QUANTITY, product);
    calculateCartValue(DEFAULT_QUANTITY, product);
    notify({
      id: crypto.randomUUID(),
      content: "Add to cart successfully",
      isOpen: true,
      type: "success",
    });
  }, [product]);

  return (
    <div className="flex w-80 flex-col items-center justify-center gap-1 rounded-lg border-[0.0625rem] border-solid border-black bg-white p-2 shadow-xl">
      <div className="relative flex aspect-square w-60 items-center justify-center ">
        <Link to={`/product/${product.id}`}>
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

          <p className="text-sm text-gray-500 line-clamp-2">
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
        <SmallButton name="Add to Cart" onClick={handleAddToCart} />
      </div>
    </div>
  );
};

export default ProductCard;
