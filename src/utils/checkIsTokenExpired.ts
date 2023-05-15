import jwtDecode from "jwt-decode";
import React from "react";
import { JWTDecodeType } from "../constants/data";

export const checkIsTokenExpired = (token?: string): boolean => {
  if (!token) {
    return true;
  }

  const decodedToken: JWTDecodeType = jwtDecode(token);

  if (!decodedToken.exp) {
    return false;
  }

  const expirationTime = new Date(decodedToken.exp * 1000);
  return expirationTime < new Date();
};
