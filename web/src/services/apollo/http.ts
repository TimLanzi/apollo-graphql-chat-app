import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const BACKEND_URL = process.env.NODE_ENV === "production"
  ? process.env.REACT_APP_BACKEND_URL_PROD
  : process.env.REACT_APP_BACKEND_URL;

// HTTP link for GraphQL queries and mutations.
// Using the upload client also supports file/image uploads.
const httpLink = createHttpLink({
  uri: `${BACKEND_URL}/graphql`,
  // credentials: "include",
})

// Middleware for adding auth token to header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    },
  };
});

export default authLink.concat(httpLink);