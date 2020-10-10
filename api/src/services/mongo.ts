import mongoose from "mongoose";
// import { mongodb } from "../config";
import { mongodb } from "../config.json";

export default async() => {
  mongoose.Promise = require("bluebird");
  mongoose.connection.once("open", () => console.log("> Connected to database."));
  mongoose.set("debug", true);

  try {
    mongoose.connect(mongodb, { 
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(e);
  }
}