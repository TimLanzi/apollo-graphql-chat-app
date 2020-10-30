import jwt from "./jwt";
import User, { IUser } from "../models/user";

export async function login(username: string): Promise<string> {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.createToken(user);

    return token;
  } catch (e) {
    throw e;
  }
}

export async function register(username: string): Promise<string> {
  try {
    const exists = await User.findOne({ username: new RegExp(`^${username}$`, "ig")});
    if (exists) {
      throw new Error("Username already exists");
    }

    const user = await new User({ username }).save();

    const token = jwt.createToken(user);

    return token;
  } catch (e) {
    throw e;
  }
}

export async function getUser(uid: string): Promise<IUser> {
  try {
    const user = await User.findById(uid);
    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  } catch (e) {
    throw e;
  }
}