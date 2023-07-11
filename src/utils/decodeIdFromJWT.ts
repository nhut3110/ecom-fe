import jwtDecode from "jwt-decode";
import { JWTDecodeType } from "../constants";

const decodeIdFromJWT = (token?: string) => {
  if (!token) return undefined;

  const decodedJWT: JWTDecodeType = jwtDecode(token);
  const id = decodedJWT.id;
  return id;
};

export default decodeIdFromJWT;
