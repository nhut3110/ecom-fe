import jwtDecode from "jwt-decode";
import React from "react";
import { JWTDecodeType } from "../constants/data";

const decodeEmailFromJWT = (token?: string) => {
  if (!token) return undefined;

  const decodedJWT: JWTDecodeType = jwtDecode(token);
  const email = decodedJWT.email;
  return email;
};

export default decodeEmailFromJWT;
