import jwt from "jsonwebtoken";
import { secret } from "../config.json";

export interface IUserJWT {
  uid: string;
  roles?: {
    admin: boolean;
  };
}

export function verify(token: string): object|string {
  if (token?.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  return jwt.verify(token, secret);
}

export default { verify };