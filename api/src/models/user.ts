import mongoose, { Schema, Document, Types } from "mongoose";
import { IChatroom } from "./chatroom";
import { IMessage } from "./message";

const UserSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  chatrooms: [{
    type: Schema.Types.ObjectId,
    ref: "Chatroom"
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Message"
  }]
});

interface IUserSchema extends Document {
  created: Date;
  username: string;
}

export interface IUser extends IUserSchema {
  chatrooms: Types.Array<IChatroom["_id"]>;
  messages: Types.Array<IMessage["_id"]>;
}

export interface IUser_populated extends IUserSchema {
  chatrooms: Types.Array<IChatroom>;
  messages: Types.Array<IMessage>;
}

export default mongoose.model<IUser>("User", UserSchema);