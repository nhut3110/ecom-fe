import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import HeartButton from "./HeartButton";
import RatingStar from "../shared/RatingStar";
import { FlyingImageWrapper } from "../shared/FlyingImage";
import GifLoading from "../shared/GifLoading";
import { FavoriteContext } from "../../context/FavoriteContext";
import { CartContext } from "../../context/CartContext";
import { NotificationContext } from "../../context/NotificationContext";
import {
  ADD_PRODUCT_DELAY,
  MAX_FAVORITES,
  ProductDetails,
} from "../../constants";
import { addFavorite, removeFavorite } from "../../services/products.api";
import { addToCart } from "../../services";
import { Button, Tag } from "antd";
import { formatVNDPrice } from "../../utils/formatVNDPrice";
import { getLocalStorageValue } from "../../utils";

const DEFAULT_QUANTITY = 1; // default value when user clicks on add to cart

const ProductCard = (props: {
  product: ProductDetails;
  isFavorite: boolean;
  hideFavorite?: boolean;
  hideHoverAnimation?: boolean;
}): React.ReactElement => {
  const {
    product,
    isFavorite,
    hideFavorite = false,
    hideHoverAnimation = false,
  } = props;

  const [love, setLove] = useState(isFavorite);
  const [animation, setAnimation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { notify } = useContext(NotificationContext);
  const {
    addFavorite: addToContext,
    removeFavorite: removeFromContext,
    favoriteState,
  } = useContext(FavoriteContext);
  const {
    addToCart: addToCartContext,
    calculateCartValue,
    cartState,
  } = useContext(CartContext);

  const isLogin = useMemo(
    () => !!Object.keys(getLocalStorageValue({ key: "tokens" })).length,
    []
  );

  const notifyFavoriteAction = () => {
    notify({
      content: `Successfully ${love ? "remove from" : "added to"} favorites`,
      type: "favorite",
      open: true,
      id: crypto.randomUUID(),
    });

    setLove(!love);
    setLoading(false);
  };

  const handleRemoveFavorite = async () => {
    await removeFavorite(product.id);
    removeFromContext(product);
    notifyFavoriteAction();
  };

  const handleAddFavorite = async () => {
    await addFavorite(product.id);
    addToContext(product);
    notifyFavoriteAction();
  };

  const handleFavorites = useCallback(async () => {
    if (!love && favoriteState.favoriteList.length >= MAX_FAVORITES)
      return notify({
        content: `Reached maximum favorites`,
        type: "warning",
        open: true,
        id: crypto.randomUUID(),
      });

    setLoading(true);

    if (love) return handleRemoveFavorite();

    return handleAddFavorite();
  }, [love]);

  const [integerPart, decimalPart] = useMemo(() => {
    let price = product.price;
    if (product?.discountPercentage > 0) {
      price = price - (price * product.discountPercentage) / 100;
    }
    const [integer, decimal] = price.toFixed(2).toString().split(".");
    return [integer, decimal];
  }, [product.price, product.discountPercentage]);

  const handleAddToCart = useCallback(async () => {
    try {
      await addToCart({ quantity: DEFAULT_QUANTITY, productId: product.id });

      addToCartContext(DEFAULT_QUANTITY, product, crypto.randomUUID());
      calculateCartValue(DEFAULT_QUANTITY, product);

      setLoading(true);
      notify({
        id: crypto.randomUUID(),
        content: "Add to cart successfully",
        open: true,
        type: "success",
      });
    } catch (error) {
      notify({
        id: crypto.randomUUID(),
        content: "Add to cart failed",
        open: true,
        type: "error",
      });
    }

    setTimeout(() => {
      setLoading(false);
    }, ADD_PRODUCT_DELAY);
  }, [product]);

  useEffect(() => {
    const cartProduct = cartState.cartList[product.id];
    if (cartProduct) {
      setAnimation(!!cartProduct.cartAnimations.length);
    }
  }, [cartState.cartList[product.id]]);

  useEffect(() => {
    setLove(isFavorite);
  }, [isFavorite]);

  return (
    <>
      {loading && <GifLoading />}
      <motion.div
        whileHover={{
          scale: hideHoverAnimation ? 1 : 1.05,
        }}
        className="relative flex w-80 flex-col items-center justify-center gap-1 rounded-lg border-[0.0625rem] border-solid border-black bg-white p-2 shadow-xl"
      >
        <div className="relative flex aspect-square w-60 items-center justify-center">
          <Link to={isLogin ? `/product/${product.id}` : ""}>
            {animation && <FlyingImageWrapper product={product} />}
            <img
              src={`${product.image}`}
              alt={product.title}
              className="object-fit h-36"
            />
          </Link>
          {!hideFavorite && isLogin && (
            <HeartButton
              love={love}
              className="absolute -right-2 top-2"
              onClick={handleFavorites}
            />
          )}
        </div>

        {!!product.discountPercentage && (
          <div className="absolute left-5 top-5">
            <Tag color="yellow">
              <p className="text-lg font-semibold">{`-${product.discountPercentage}%`}</p>
            </Tag>
          </div>
        )}

        <div className="flex w-full justify-between gap-2 px-2">
          <div className="flex w-[65%] flex-col ">
            <Link to={isLogin ? `/product/${product.id}` : ""}>
              <motion.p
                whileHover={{ scale: 1.05 }}
                className="truncate text-lg font-semibold"
              >
                {product.title}
              </motion.p>
            </Link>

            <p className="line-clamp-2 text-sm text-gray-500">
              {product.description}
            </p>
          </div>
          <div className="flex items-start justify-end">
            <p className="text-lg font-bold">
              {formatVNDPrice(Number(integerPart))}
            </p>
            <p className="text-xs font-bold">đ</p>
            {/* <p className="text-xs font-bold">
              .{decimalPart ? decimalPart : "00"}
            </p> */}
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-1 self-start px-1">
          <div className="flex gap-1">
            <RatingStar rating={product.rate} disabled />
            <p className="text-sm text-gray-500">({product.rate})</p>
          </div>

          {/* Display original price as a comment in the code if discount is applied */}
          {product?.discountPercentage > 0 && (
            <div className="text-sm text-red-500 line-through">
              {formatVNDPrice(product.price)}đ
            </div>
          )}
        </div>

        <div className="mb-2 mt-5 w-full self-start">
          {isLogin && (
            <Button
              className="bg-red-200"
              block
              onClick={handleAddToCart}
              disabled={!product.availableQuantity || !product.price}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard;

export const ProductCardSkeleton = () => {
  return (
    <div className="flex h-[25.625rem] w-80 animate-pulse flex-col items-center justify-center gap-1 rounded-lg border-[0.0625rem] border-solid border-slate-400 bg-white p-2 shadow-xl">
      <div className="relative flex aspect-square h-60 w-64 items-center justify-center rounded-3xl bg-slate-100" />
      <div className="flex w-full justify-between">
        <div className="flex w-[75%] flex-col gap-2">
          <div className="h-7 w-52 rounded-full bg-slate-100" />
          <div className="h-10 w-52 rounded-full bg-slate-100" />
        </div>

        <div className="flex items-start justify-end">
          <div className="h-7 w-10 rounded-full bg-slate-100" />
        </div>
      </div>

      <div className="flex items-center gap-1 self-start px-1">
        <div className="h-5 w-36 rounded-full bg-slate-100" />
      </div>

      <div className="mt-2 w-auto self-start">
        <div className="m-1 h-9 w-28 rounded-md bg-slate-100" />
      </div>
    </div>
  );
};
