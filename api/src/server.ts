
import http from "http";
import express from "express";
import exJWT from "express-jwt";
import cors from "cors";
// import installSocketIOHandlers from "./services/sockets";
import mongodb from "./services/mongo";
import apolloServer from "./services/apollo";
// import { port, secret } from "./config";
import { port, secret } from "./config.json"

(async function main() {
  try {
    await mongodb();

    const app = express();
    app.use(cors());
    app.use(exJWT({ secret, credentialsRequired: false }));
    
    apolloServer.applyMiddleware({ app, path: "/graphql" });
    const ws = http.createServer(app);
    apolloServer.installSubscriptionHandlers(ws);
    
    ws.listen(port, () => console.log(`> Listening at http://localhost:${port}`));
  } catch (e) {
    console.log(e);
  }
})();
