"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriptions = exports.Mutations = void 0;
var MessageService = __importStar(require("../../services/messaging"));
var pubsub_1 = __importDefault(require("../../services/pubsub"));
exports.Mutations = {
    createMessage: function (parent, args, _a) {
        var user = _a.user;
        if (!user) {
            throw new Error("Not authorized");
        }
        return MessageService.send(args, user.uid);
    }
};
exports.Subscriptions = {
    newMessageInRoom: {
        subscribe: function (parent, args, _a) {
            var user = _a.user;
            return pubsub_1.default.asyncIterator("ROOM_MESSAGE_" + args.rid);
        },
    }
};
