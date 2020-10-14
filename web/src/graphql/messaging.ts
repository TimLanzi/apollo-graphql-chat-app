import { gql } from "@apollo/client";

export const SEARCH_FOR_USERS = gql`
  query($query: String!) {
    users(query: $query) {
      id
      username
    }
  }
`;

export const CREATE_CHATROOM = gql`
  mutation($members: [ID]!, $message: String!) {
    createChatroom(members: $members, message: $message) {
      id
      messages {
        id
        sender {
          id
          username
        }
        timestamp
        content
      }
      lastMessage {
        id
        sender {
          id
          username
        }
        timestamp
        content
      }
    }
  }
`;

export const CHATROOM = gql`
  query($id: ID!) {
    chatroom(id: $id) {
      id
      name
      created
      users {
        id
        username
      }
      messages {
        id
        sender {
          id
          username
        }
        timestamp
        content
      }
      unreadMessages
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation($rid: ID!, $msg: String!) {
    createMessage(rid: $rid, msg: $msg) {
      id
      sender {
        id
        username
      }
      timestamp
      content
    }
  }
`;

export const NEW_MESSAGE_IN_ROOM = gql`
  subscription($rid: ID!) {
    newMessageInRoom(rid: $rid) {
      id
      messages {
        id
        sender {
          id
          username
        }
        timestamp
        content
      }
    }
  }
`;

export const NEW_ROOM_CREATED = gql`
  subscription {
    newRoomCreated {
      id
      name
      users {
        id
        username
      }
      lastMessage {
        id
        sender {
          id
          username
        }
        timestamp
        content
      }
      unreadMessages
     }
  }
`;

export const NEW_MESSAGE_FOR_USER = gql`
  subscription {
    newMessageForUser {
      id
      name
      users {
        id
        username
      }
      lastMessage {
        id
        sender {
          id
          username
        }
        timestamp
        content
      }
      unreadMessages
    }
  }
`;

export const MARK_CHATROOM_MESSAGES_READ = gql`
  mutation($rid: ID!) {
    markChatroomMessagesRead(rid: $rid) {
      id
      unreadMessages
    }
  }
`;