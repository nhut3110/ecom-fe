import { OrderStatus, PaymentOptions, ProductDetails } from "../constants";

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

export type FindDiscountType = {
  sortBy?: string;
  sortDirection?: string;
  discountType?: "percentage" | "fixed" | "tiered";
  active?: boolean;
  isValid?: boolean;
  search?: string;
  userId?: string;
};

export type PaginatedResponse = {
  data: ProductDetails[];
  pagination: {
    total: number;
    nextCursor?: string;
  };
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartProduct = {
  id: string;
  title: string;
  image: string;
  price: number;
  availableQuantity: number;
  discountPercentage: number;
};

export type CartType = {
  quantity: number;
  product: CartProduct;
};

export type AddressType = {
  id: string;
  phoneNumber: string;
  name: string;
  email: string;
  address: string;
  lat?: number;
  lng?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type PaymentType = {
  id: string;
  cardNumber: string;
  cardOwner: string;
  cvc: string;
  expiry: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AddOrderType = {
  addressId: string;
  paymentId?: string;
  paymentType: PaymentOptions;
  description?: string;
  amount: number;
  discountId?: string;
};

export interface Discount {
  id: string; // UUID, auto-generated
  code: string; // Unique string, required
  description?: string; // Optional text
  discountType: "percentage" | "fixed" | "tiered"; // Enum, required
  discountValue: number; // Float, required
  startDate: Date; // Date, required
  endDate: Date; // Optional Date
  minPurchaseAmount?: number; // Optional float
  maxDiscountAmount?: number; // Optional float
  active: boolean; // Boolean, default true
  createdAt: Date; // Date, auto-generated
  updatedAt: Date; // Date, auto-generated
}

export interface UserDiscount {
  id: string;
  discountId: string;
  usageCount: number;
  userId: string;
  createdAt: Date; // Date, auto-generated
  updatedAt: Date; // Date, auto-generated
  discount: Discount;
}

export interface Order {
  id: string;
  orderStatus: OrderStatus;
  createdAt: Date;
  paymentType: PaymentOptions;
  description?: string;
  payment?: {
    cardNumber: string;
  };
  address: AddressType;
  orderDetails: CartType[];
  amount: number;
  discountId?: string;
}

export interface Comment {
  id: string;
  userId: string;
  productId: string;
  text: string;
  rating: number;
  images: CommentImage[];
  user?: UserData;
  product?: ProductDetails;
  createdAt?: string;
  updatedAt?: string;
  likeCount: number;
  dislikeCount: number;
  currentUserReaction: "like" | "dislike";
  isCurrentUserReported: boolean;
}

export interface CommentImage {
  id: string;
  commentId: string;
  imageUrl: string;
}

export interface Discussion {
  id: string;
  userId: string;
  productId: string;
  parentId?: string;
  text: string;
  replies?: Discussion[];
  parent?: Discussion;
  user?: UserData;
  product?: ProductDetails;
  createdAt?: string;
  updatedAt?: string;
}

export interface DiscussionListItem {
  userId: string;
  comId: string;
  avatarUrl: string;
  fullName: string;
  text: string;
  replies: DiscussionListItem[];
  commentId?: string;
}

export interface ReactionData {
  commentId: string;
  type: "like" | "dislike";
}

export interface ReportData {
  commentId: string;
  reason: string;
}
