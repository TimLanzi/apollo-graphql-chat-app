import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import config from "../config";

export async function login(username: string): Promise<string> {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
      // return { error: "User not found" };
    }

    const token = jwt.sign({
      uid: user._id,
    }, config.secret, { expiresIn: "7 days" });

    return token;
    // return { token };
  } catch (e) {
    throw e;
    // return { error: e.message };
  }
}

export async function register(username: string): Promise<string> {
  try {
    const exists = await User.findOne({ username: new RegExp(`^${username}$`, "ig")});
    if (exists) {
      throw new Error("Username already exists");
      // return { error: "Username already exists" };
    }

    const user = await new User({ username }).save();

    const token = jwt.sign({
      uid: user._id,
    }, config.secret, { expiresIn: "7 days" });

    return token;
    // return { token };
  } catch (e) {
    throw e;
    // return { error: e.message };
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