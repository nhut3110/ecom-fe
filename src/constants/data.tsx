import { CartStateType } from "../context/CartContext";
import {
  AddressType,
  InformationType,
  PaymentType,
} from "../context/FormContext";
import Layout from "../layout/Layout";
import AddAddress from "../pages/AddAddress";
import Address from "../pages/Address";
import AddressDetail from "../pages/AddressDetail";
import Cart from "../pages/Cart";
import ChangePassword from "../pages/ChangePassword";
import Checkout from "../pages/Checkout";
import EditProfile from "../pages/EditProfile";
import Favorite from "../pages/Favorite";
import GetToken from "../pages/GetToken";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Order from "../pages/Order";
import Payment from "../pages/Payment";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import AddPayment from "../pages/AddPayment";
import OrderDetail from "../pages/OrderDetail";
import {
  BankOutlined,
  HeartOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Banner1, Banner2, Banner3, Banner4 } from "../assets/images";
import { Theme } from "../pages/Theme";
import ThemeDetail from "../pages/ThemeDetail";
import Discount from "../pages/Discount";

export type AddressCardType = {
  id?: string;
  address?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  lat?: number;
  lng?: number;
};

export type PaymentCard = {
  id?: string;
  cardNumber?: string;
  cardOwner?: string;
  cvc?: string;
  expiry?: string;
};

type CarouselImageType = {
  url: string;
  category: string;
};

type Routes = {
  path: string;
  component: React.ElementType;
  layout?: React.ElementType;
};

export type JWTDecodeType = {
  id?: string;
  iat?: string;
  exp?: string;
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

export type EditProfileFormType = {
  name?: string;
  phoneNumber?: string;
};

export type SortOptionType = {
  sortBy: string;
  sortDirection: string;
};

export type FilterOptionType = {
  categoryId?: string;
  year?: number | string;
  maxPrice?: number | string;
  minPrice?: number | string;
};

export interface ProductDetails {
  id: string;
  title: string;
  price: number;
  description?: string | null;
  image: string;
  thumbnailUrl: string;
  categoryId: string;
  rate: number;
  count: number;
  setId: number;
  numberId: string;
  pieces: number;
  year: number;
  instructionsCount: number;
  minifigs: number;
  height: number;
  depth: number;
  width: number;
  weight: number;
  discountPercentage: number;
  availableQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name?: string;
  productCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export const PAGE_LIMIT = 12;
export const MAX_FAVORITES = 100;
export const PRODUCT_PREFIX = "product:";
export const FAVORITE_PREFIX = "favorite:";

export const enum PaymentOptions {
  CASH = "cash",
  CARD = "card",
}

export enum OrderStatus {
  "pending",
  "confirmed",
  "paid",
  "shipping",
  "completed",
  CANCELED = "canceled",
}

export const paymentOptions = [PaymentOptions.CASH, PaymentOptions.CARD];

type RegisterFieldTypes = {
  name: string;
  type?: string;
};

export const defaultLocation = {
  lat: 16.060957158551425,
  lng: 108.21611451111367,
};

export const OTP_LENGTH = 6;

export const DELAY_OTP_TIME = 120000; // 2 minutes in milliseconds

export const registerFields: RegisterFieldTypes[] = [
  {
    name: "name",
  },
  {
    name: "email",
    type: "email",
  },
  {
    name: "password",
    type: "password",
  },
  {
    name: "confirmPassword",
    type: "password",
  },
];

export const notDisplayCartButton: string[] = ["/checkout"];

export const facebookConstants = {
  clientID: "1213240936224087",
  callbackUrl: "http://localhost:5173/auth/facebook/callback/",
};

export enum NavItemType {
  PRODUCTS = "products",
  ORDERS = "orders",
  THEMES = "themes",
  DISCOUNT = "discounts",
}

export const navList: NavItemType[] = [
  NavItemType.THEMES,
  NavItemType.PRODUCTS,
  NavItemType.DISCOUNT,
  NavItemType.ORDERS,
];

export const enum AccountType {
  FACEBOOK = "facebook",
  LOCAL = "local",
}

export const ADD_PRODUCT_DELAY = 1500; // 1.5s to prevent user from click continuously will change later when apply api

export const carouselImages: Array<CarouselImageType> = [
  {
    url: Banner1,
    category: "jewelry",
  },
  {
    url: Banner2,
    category: "men clothing",
  },
  {
    url: Banner3,
    category: "women clothing",
  },
  {
    url: Banner4,
    category: "electronics",
  },
];

export const gifURLLoading =
  "https://media.tenor.com/emHVRG7_-cgAAAAC/seseren.gif";

export const footerContact: string[] = [
  "We provide the best experience.",
  "Call us: (+84) 931 910 JQK",
  "Email: legood.store@info.com",
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

export const userMenu = [
  {
    name: "Profile",
    url: "profile",
    icon: <UserOutlined />,
  },
  {
    name: "Favorites",
    url: "favorites",
    icon: <HeartOutlined />,
  },
  {
    name: "Address",
    url: "address",
    icon: <ShopOutlined />,
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
    path: "/product/:productId",
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
  {
    path: "/orders/:id",
    component: OrderDetail,
    layout: Layout,
  },
  {
    path: "/profile",
    component: Profile,
    layout: Layout,
  },
  {
    path: "/profile/edit",
    component: EditProfile,
    layout: Layout,
  },
  {
    path: "/profile/password",
    component: ChangePassword,
    layout: Layout,
  },
  {
    path: "/auth/:socialType/callback/",
    component: GetToken,
  },
  {
    path: "/address",
    component: Address,
    layout: Layout,
  },
  {
    path: "/address/:id",
    component: AddressDetail,
    layout: Layout,
  },
  {
    path: "/address/add",
    component: AddAddress,
    layout: Layout,
  },
  {
    path: "/themes",
    component: Theme,
    layout: Layout,
  },
  {
    path: "/themes/:id",
    component: ThemeDetail,
    layout: Layout,
  },
  {
    path: "/discounts",
    component: Discount,
    layout: Layout,
  },
];
