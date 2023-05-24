export type TokensType = {
  accessToken?: string;
  refreshToken?: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type FacebookLoginType = {
  code: string;
  callbackUrl: string;
};

export type UserData = {
  email?: string;
  id?: string;
  name?: string;
  picture?: string;
  phoneNumber?: string;
  provider?: string;
  shippingPoint?: number;
  createAt?: string;
  updateAt?: string;
};

export type CategoryType = {
  name: string;
  id: string;
};
