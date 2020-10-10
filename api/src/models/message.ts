import mongoose, { Schema, Document } from "mongoose";
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
  }
});

interface IMessageSchema extends Document {
  timestamp: Date;
  content: string;
}

export interface IMessage extends IMessageSchema {
  sender: IUser["_id"];
  room: IChatroom["_id"];
}

export interface IMessage_populated extends IMessageSchema {
  sender: IUser;
  room: IChatroom;
}

export default mongoose.model<IMessage>("Message", MessageSchema);