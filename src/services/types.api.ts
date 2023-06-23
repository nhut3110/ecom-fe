import { ProductDetails } from "../constants";

export type TokensType = {
  accessToken?: string;
  refreshToken?: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

export type FacebookLoginType = {
  code: string;
  callbackUrl: string;
  password?: string;
};

export type UserData = {
  email?: string;
  id?: string;
  name?: string;
  picture?: string;
  phoneNumber?: string;
  provider?: string;
  shippingPoint?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CategoryType = {
  name: string;
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ErrorResponseType = {
  statusCode?: number;
  message?: string;
  error?: string;
};

export type FindProductType = {
  sortBy?: string;
  sortDirection?: string;
  categoryId?: string;
  title?: string;
  cursor?: string;
  limit?: number;
};

export type PaginatedResponse = {
  data: ProductDetails[];
  pagination: {
    total: number;
    nextCursor?: string;
  };
};
