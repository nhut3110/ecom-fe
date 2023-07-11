import jwtDecode from "jwt-decode";
import { JWTDecodeType } from "../constants";

export const checkIsTokenExpired = (token?: string): boolean => {
  if (!token) {
    return true;
  }

  const decodedToken: JWTDecodeType = jwtDecode(token);

  if (!decodedToken.exp) {
    return false;
  }

  const expirationTime = new Date(parseInt(decodedToken.exp) * 1000);
  return expirationTime < new Date();
};
