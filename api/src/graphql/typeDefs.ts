import { gql } from "apollo-server-express";


export default gql`
  type Error {
    error: Boolean
    message: String
  }

  type User {
    id: ID!
    created: String!
    username: String
    chatrooms: [Chatroom]
    messages: [Message]
  }

  type Chatroom {
    id: ID!
    creator: User
    created: String!
    name: String
    users: [User]!
    lastMessage: Message
    messages: [Message]
  }

  type Message {
    id: ID
    sender: User
    timestamp: String
    room: Chatroom
    content: String
  }


  type Query {
    session: User
    user(id: ID!): User
    users(query: String!): [User]
    login(username: String!): String
    chatroom(id: ID!): Chatroom
    sessionChatrooms: [Chatroom]
    test: Chatroom
  }

  type Mutation {
    createUser(username: String!): String
    createChatroom(members: [ID]!, message: String!): Chatroom
    createMessage(rid: ID!, msg: String!): Message
  }

  type Subscription {
    newMessageInRoom(rid: ID!): Message
    newRoomCreated: Chatroom
    newMessageForUser: Chatroom
  }
`;