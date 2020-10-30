import mongoose from "mongoose";
import config from "../config";

export default async function connectToDB(): Promise<void> {
  mongoose.Promise = require("bluebird");
  mongoose.connection.once("open", () => console.log("> Connected to database."));
  mongoose.set("debug", true);

  try {
    mongoose.connect(config.mongodb, { 
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(e);
  }
}