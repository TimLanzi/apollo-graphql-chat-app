"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.create = void 0;
var models_1 = require("../models");
var pubsub_1 = __importDefault(require("../services/pubsub"));
function create(uid, memberIDs, msg) {
    return __awaiter(this, void 0, void 0, function () {
        var user, members, chatroom, message, _i, members_1, member, _a, memberIDs_1, id, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4, models_1.User.findById(uid)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        throw new Error("User not found.");
                    }
                    return [4, models_1.User.find({ _id: { $in: memberIDs } })];
                case 2:
                    members = _b.sent();
                    if (members.length <= 0) {
                        throw new Error("No users could be found");
                    }
                    chatroom = new models_1.Chatroom({
                        creator: uid,
                        users: __spreadArrays([uid], memberIDs),
                    });
                    message = new models_1.Message({
                        sender: uid,
                        room: chatroom._id,
                        content: msg,
                    });
                    chatroom.messages.push(message._id);
                    user.chatrooms.push(chatroom._id);
                    user.messages.push(message._id);
                    message.save();
                    user.save();
                    for (_i = 0, members_1 = members; _i < members_1.length; _i++) {
                        member = members_1[_i];
                        member.chatrooms.push(chatroom._id);
                        member.save();
                    }
                    for (_a = 0, memberIDs_1 = memberIDs; _a < memberIDs_1.length; _a++) {
                        id = memberIDs_1[_a];
                        pubsub_1.default.publish("NEW_ROOM_" + id, { newRoomCreated: chatroom });
                    }
                    return [4, chatroom.save()];
                case 3:
                    _b.sent();
                    return [2, chatroom];
                case 4:
                    e_1 = _b.sent();
                    throw e_1;
                case 5: return [2];
            }
        });
    });
}
exports.create = create;
function addUser(uid, rid) {
    return __awaiter(this, void 0, void 0, function () {
        var user, room;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, models_1.User.findById(uid)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new Error("User not found.");
                    }
                    return [4, models_1.Chatroom.findById(rid)];
                case 2:
                    room = _a.sent();
                    if (!room) {
                        throw new Error("Room not found");
                    }
                    user.chatrooms.push(rid);
                    user.save();
                    room.users.push(uid);
                    return [4, room.save()];
                case 3:
                    _a.sent();
                    return [2, room];
            }
        });
    });
}
exports.addUser = addUser;
