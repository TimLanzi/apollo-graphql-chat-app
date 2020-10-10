import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./user";
import { IMessage } from "./message";

const ChatroomSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    // required: true,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Message"
  }]
});

interface IChatroomSchema extends Document {
  name: string;
  created: Date;
}

export interface IChatroom extends IChatroomSchema {
  creator: IUser["_id"];
  users: Types.Array<IUser["_id"]>;
  messages: Types.Array<IMessage["_id"]>;
}

export interface IChatroom_populated extends IChatroomSchema {
  creator: IUser;
  users: Types.Array<IUser>;
  messages: Types.Array<IMessage>;
}

export default mongoose.model<IChatroom>("Chatroom", ChatroomSchema);