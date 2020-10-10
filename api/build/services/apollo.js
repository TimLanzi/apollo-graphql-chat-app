"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var typeDefs_1 = __importDefault(require("../graphql/typeDefs"));
var schema_1 = __importDefault(require("../graphql/schema"));
var jwt_1 = __importDefault(require("./jwt"));
var apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: schema_1.default,
    context: function (_a) {
        var req = _a.req, payload = _a.payload;
        if (payload) {
            if (payload.authToken) {
                var user = jwt_1.default.verify(payload.authToken);
                return { user: user };
            }
            else {
                return {};
            }
        }
        else {
            return { user: req.user };
        }
    },
    subscriptions: {
        onConnect: function () { return console.log("> Client connected to subscriptions."); },
        onDisconnect: function () { return console.log("> Client disconnected from subscriptions."); },
    },
});
exports.default = apolloServer;
