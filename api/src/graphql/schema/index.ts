
import { Chatroom, User, Message } from "../../models";
import * as UserResolvers from "./user"
import * as ChatroomResolvers from "./chatroom";
import * as MessageResolvers from "./message";

export default {
  User: {
    chatrooms: parent => Chatroom.find({ _id: { $in: parent.chatrooms }}),
    messages: parent => Message.find({ _id: { $in: parent.messages }}),
  },

  Chatroom: {
    creator: parent => User.findById(parent.creator),
    users: parent => User.find({ _id: { $in: parent.users }}),
    messages: parent => Message.find({ _id: { $in: parent.messages }}),
    lastMessage: async(parent) => {
      const message = await Message.find({ _id: { $in: parent.messages }}).sort({ timestamp: -1 }).limit(1)
      console.log(message)
      return message
    },
  },

  Message: {
    sender: parent => User.findById(parent.sender),
    room: parent => Chatroom.findById(parent.room),
  },

  Query: {
    ...UserResolvers.Queries,
    ...ChatroomResolvers.Queries,
  },

  Mutation: {
    ...UserResolvers.Mutations,
    ...ChatroomResolvers.Mutations,
    ...MessageResolvers.Mutations,
  },

  Subscription: {
    ...ChatroomResolvers.Subscriptions,
    ...MessageResolvers.Subscriptions,
  }
}