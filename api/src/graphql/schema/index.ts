import { GraphQLDateTime } from "graphql-iso-date";
import { Chatroom, User, Message } from "../../models";
import * as UserResolvers from "./user"
import * as ChatroomResolvers from "./chatroom";
import * as MessageResolvers from "./message";
import { IResolverObject } from "apollo-server-express";

export default {
  DateTime: GraphQLDateTime as any,

  User: {
    chatrooms: parent => Chatroom.find({ _id: { $in: parent.chatrooms }}),
    messages: parent => Message.find({ _id: { $in: parent.messages }}),
  },

  Chatroom: {
    creator: parent => User.findById(parent.creator),
    users: parent => User.find({ _id: { $in: parent.users }}),
    messages: parent => Message.find({ _id: { $in: parent.messages }}),
    lastMessage: parent => Message.findOne({ _id: { $in: parent.messages }}).sort({ timestamp: -1 }).limit(1),
    unreadMessages: (parent, args, { user }) => Message.find({ _id: parent.messages, readBy: { $ne: user.uid } }).countDocuments(),
  },

  Message: {
    sender: parent => User.findById(parent.sender),
    room: parent => Chatroom.findById(parent.room),
  },

  Query: {
    ...UserResolvers.Queries,
    ...ChatroomResolvers.Queries,
    // test: (parent, args, { user }) => {
    //   return Chatroom.findOne({ users: [user.uid, "5f7f1cf09f1e1d35682a892c"], $where: "this.users.length == 2" })
    // }
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