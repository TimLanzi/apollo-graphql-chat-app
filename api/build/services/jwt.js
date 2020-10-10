"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
function verify(token) {
    if (token === null || token === void 0 ? void 0 : token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }
    return jsonwebtoken_1.default.verify(token, config_1.default.secret);
}
exports.verify = verify;
exports.default = { verify: verify };
