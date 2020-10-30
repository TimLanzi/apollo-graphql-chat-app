import jwt from "jsonwebtoken";
import config from "../config";
import { IUser } from "../models/user";

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

export function createToken(user: IUser): string {
  // If roles are added, compile them and add to token

  return jwt.sign({
    uid: user._id,
  }, config.secret, { expiresIn: "7 days" });
}

export default { verify, createToken };