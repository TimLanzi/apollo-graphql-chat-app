import jwt from "jsonwebtoken";
import config from "../config";

export interface IUserJWT {
  uid: string;
  roles?: {
    admin: boolean;
  };
}

export function verify(token: string): object|string {
  try {
    if (token?.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    return jwt.verify(token, config.secret);
  } catch (e) {
    console.error(e)
    throw e;
  }
}

export default { verify };