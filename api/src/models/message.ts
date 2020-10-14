import mongoose, { Schema, Document, Types } from "mongoose";
import { IChatroom } from "./chatroom";
import { IUser } from "./user";

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Chatroom",
  },
  content: {
    type: String,
    required: true,
  },
  readBy: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
});

interface IMessageSchema extends Document {
  timestamp: Date;
  content: string;
}

export interface IMessage extends IMessageSchema {
  sender: IUser["_id"];
  room: IChatroom["_id"];
  readBy: Types.Array<IUser["_id"]>;
}

export interface IMessage_populated extends IMessageSchema {
  sender: IUser;
  room: IChatroom;
  readBy: Types.Array<IUser>;
}

export default mongoose.model<IMessage>("Message", MessageSchema);