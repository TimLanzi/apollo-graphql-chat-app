import { ApolloClient, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import httpLink from "./http";
import cache from "./cache";
import wsLink from "./ws";

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription"
  },
  wsLink,
  httpLink,
);

// Create GraphQL client
export default new ApolloClient({
  link,
  cache,
});