
import http from "http";
import express from "express";
import exJWT from "express-jwt";
import cors from "cors";
// import installSocketIOHandlers from "./services/sockets";
import mongodb from "./services/mongo";
import apolloServer from "./services/apollo";
import config from "./config";

(async function main() {
  try {
    await mongodb();

    const app = express();
    app.use(cors());
    app.use(exJWT({ secret: config.secret, credentialsRequired: false }));
    
    apolloServer.applyMiddleware({ app, path: "/graphql" });
    const ws = http.createServer(app);
    apolloServer.installSubscriptionHandlers(ws);
    
    ws.listen(config.port, () => console.log(`> Listening at http://localhost:${config.port}`));
  } catch (e) {
    console.log(e);
  }
})();
