import * as ChatroomService from "../../services/chatroom";
import { Chatroom, User } from "../../models";
import pubsub from "../../services/pubsub";

export const Queries = {
  sessionChatrooms: (parent, args, { user }) => Chatroom.find({ users: { $elemMatch: { $eq: user.uid }}}).sort({ timestamp: -1 }),
  chatroom: (parent, args, { user }) => Chatroom.findById(args.id),
};

export const Mutations = {
  createChatroom: async(parent, args, { user }) => {
    if (!user) {
      throw new Error("Not Authorized");
    }
    return ChatroomService.create(user.uid, args.members, args.message);
  }
};

export const Subscriptions = {
  newRoomCreated: {
    subscribe: (parent, args, { user }) => {
      console.log(`hello ${user.uid}`)
      return pubsub.asyncIterator(`NEW_ROOM_${user.uid}`);
    }
  }
}