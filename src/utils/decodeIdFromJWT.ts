import jwtDecode from "jwt-decode";
import React from "react";
import { JWTDecodeType } from "../constants/data";

const decodeIdFromJWT = (token?: string) => {
  if (!token) return undefined;

  const decodedJWT: JWTDecodeType = jwtDecode(token);
  const id = decodedJWT.id;
  return id;
};

export default decodeIdFromJWT;
