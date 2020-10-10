"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubService = void 0;
var ioredis_1 = __importDefault(require("ioredis"));
var apollo_server_express_1 = require("apollo-server-express");
var graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
var config_1 = __importDefault(require("../config"));
var PubSubService = (function () {
    function PubSubService() {
        this.options = __assign(__assign({}, config_1.default.redis), { retryStrategy: function (times) { return Math.min(times * 50, 2000); } });
        this.pubsub = process.env.NODE_ENV === "production"
            ? new graphql_redis_subscriptions_1.RedisPubSub({
                publisher: new ioredis_1.default(this.options),
                subscriber: new ioredis_1.default(this.options),
            })
            : new apollo_server_express_1.PubSub();
    }
    PubSubService.prototype.asyncIterator = function (iter) {
        if (this.pubsub instanceof apollo_server_express_1.PubSub) {
            return this.pubsub.asyncIterator(iter);
        }
        else {
            return this.pubsub.asyncIterator(iter);
        }
    };
    PubSubService.prototype.publish = function (arg0, payload) {
        return this.pubsub.publish(arg0, payload);
    };
    return PubSubService;
}());
exports.PubSubService = PubSubService;
exports.default = new PubSubService();
