/*
Tim Lanzi
August 2020
*/

import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
  
const WS_BACKEND_URL = process.env.NODE_ENV === "production"
  ? process.env.REACT_APP_WEBSOCKET_URI_PROD
  : process.env.REACT_APP_WEBSOCKET_URI;

// Middleware updates auth token for websocket connection
const subscriptionMiddleware = {
  applyMiddleware: (options: any, next: any) => {
    const token = localStorage.getItem("token");
    options.authToken = token ? `Bearer ${token}` : null;
    next();
  }
};

const wsClient = new SubscriptionClient(`${WS_BACKEND_URL}/graphql`, {
  reconnect: true,
  timeout: 20000,
  lazy: true,
});

wsClient.use([subscriptionMiddleware])

// WebSocket link for GraphQL subscriptions
export default new WebSocketLink(wsClient);
  