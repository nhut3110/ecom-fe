import { CartStateType } from "../context/CartContext";
import {
  AddressType,
  InformationType,
  PaymentType,
} from "../context/FormContext";
import Layout from "../layout/Layout";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Favorite from "../pages/Favorite";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Order from "../pages/Order";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Register from "../pages/Register";

type CarouselImageType = {
  url: string;
  category: string;
};

type Routes = {
  path: string;
  component: React.ElementType;
  layout?: React.ElementType;
};

type SortOptionType = {
  name: string;
  options: string[];
};

export type FooterContentType = {
  name: string;
  content: string[];
};

export type OrderType = CartStateType &
  InformationType &
  AddressType &
  PaymentType & {
    uuid: string;
    date: number;
  };

export interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const SortOptions: SortOptionType[] = [
  {
    name: "Price",
    options: ["From Low to High", "From High to Low"],
  },
  {
    name: "Name",
    options: ["From A to Z", "From Z to A"],
  },
  {
    name: "Category",
    options: ["Electronics", "Jewelery", "Men's clothing", "Women's clothing"],
  },
];

export const testProduct: ProductDetails[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: {
      rate: 2.1,
      count: 430,
    },
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.6,
      count: 400,
    },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave ",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 3.9,
      count: 70,
    },
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 3,
      count: 400,
    },
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 1.9,
      count: 100,
    },
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    price: 64.99,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: {
      rate: 3.3,
      count: 203,
    },
  },
];

export const navList: string[] = ["products", "favorites", "cart", "orders"];

export const carouselImages: Array<CarouselImageType> = [
  {
    url: "https://idjewelry.com/media/wysiwyg/rose-gold/rose_gold_jewelry.jpg",
    category: "jewelry",
  },
  {
    url: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/264e3629894817.5609864fcd16d.png",
    category: "men clothing",
  },
  {
    url: "https://i.pinimg.com/originals/3b/a6/79/3ba679fa46d14c310ee8008891ea5754.jpg",
    category: "women clothing",
  },
  {
    url: "https://www.intelligencenode.com/blog/wp-content/uploads/2019/02/electronics.jpg",
    category: "electronics",
  },
];

export const footerContact: string[] = [
  "We provide the best experience.",
  "Call us: (+84) 931 910 JQK",
  "Email: fake.store@info.com",
];

export const footerContents: FooterContentType[] = [
  {
    name: "Useful Links",
    content: ["favorites", "cart", "order"],
  },
  {
    name: "Information",
    content: ["User Agreements", "Policies", "FAQ"],
  },
  {
    name: "Social Media",
    content: ["Facebook", "Instagram", "Twitter"],
  },
];

export const publicRoutes: Routes[] = [
  {
    path: "/",
    component: Home,
    layout: Layout,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/products",
    component: Product,
    layout: Layout,
  },
  {
    path: "/product/test",
    component: ProductDetail,
    layout: Layout,
  },
  {
    path: "/cart",
    component: Cart,
    layout: Layout,
  },
  {
    path: "/favorites",
    component: Favorite,
    layout: Layout,
  },
  {
    path: "/checkout",
    component: Checkout,
    layout: Layout,
  },
  {
    path: "/orders",
    component: Order,
    layout: Layout,
  },
];
