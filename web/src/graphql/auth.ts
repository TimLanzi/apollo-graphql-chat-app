import { gql } from "@apollo/client";

export const LOGIN = gql`
  query($username: String!) {
    login(username: $username)
  }
`;

export const REGISTER = gql`
  mutation($username: String!) {
    createUser(username: $username)
  }
`;

export const SESSION = gql`
  {
    user: sessionUser @client
  }
`;

export const USER = gql`
  {
    session {
      id
      username
      chatrooms {
        id
        lastMessage {
          id
          timestamp
        }
      }
    }
  }
`;