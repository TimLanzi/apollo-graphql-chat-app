import { ApolloServer } from "apollo-server-express";
// import schema from "../graphql/schema";
import typeDefs from "../graphql/typeDefs";
import resolvers from "../graphql/schema";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { Request } from "express";
import jwt, { IUserJWT } from "./jwt";

interface AuthRequest extends Request {
  user: IUserJWT;
}

interface AuthContext extends ExpressContext {
  req: AuthRequest;
  payload: any;
}

const apolloServer = new ApolloServer({
  // schema,
  typeDefs,
  resolvers,
  context: ({ req, payload }: AuthContext) => {
    if (payload) {
      if (payload.authToken) {
        const user = jwt.verify(payload.authToken);
        return { user };
      } else {
        return {};
      }
    } else {
      return { user: req.user };
    }
  },
  subscriptions: {
    onConnect: () => console.log("> Client connected to subscriptions."),
    onDisconnect: () => console.log("> Client disconnected from subscriptions."),
  },
});

export default apolloServer;