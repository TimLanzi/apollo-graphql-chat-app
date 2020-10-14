import { gql } from "@apollo/client";

export const CHATROOMS = gql`
  {
    chatrooms: sessionChatrooms {
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