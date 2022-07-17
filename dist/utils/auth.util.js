"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = exports.methods = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
const env_config_1 = __importDefault(require("../configs/env.config"));
// Promisified methods
exports.methods = {
    sign: (0, util_1.promisify)(jsonwebtoken_1.default.sign),
    verify: (0, util_1.promisify)(jsonwebtoken_1.default.verify),
};
// Sign
const sign = async (payload, options) => {
    return await jsonwebtoken_1.default.sign(payload, env_config_1.default.jwt.secret, Object.assign({ expiresIn: env_config_1.default.jwt.expiresIn }, options));
};
exports.sign = sign;
// Verify
const verify = async (token) => {
    return await jsonwebtoken_1.default.verify(token, env_config_1.default.jwt.secret);
};
exports.verify = verify;
