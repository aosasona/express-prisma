"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../services/db");
const validator_1 = __importDefault(require("validator"));
const auth_util_1 = require("../../utils/auth.util");
const error_handler_1 = __importDefault(require("../../utils/handlers/error.handler"));
const response_handler_1 = __importDefault(require("../../utils/handlers/response.handler"));
const env_config_1 = __importDefault(require("../../configs/env.config"));
const login = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        let { identifier, password } = req.body;
        // Check that fields are not empty
        if (!(identifier && password)) {
            throw new error_handler_1.default("Please fill in all fields", 400);
        }
        // Check that email or username is valid
        if (!validator_1.default.isEmail(identifier) && !validator_1.default.isAscii(identifier)) {
            throw new error_handler_1.default("Invalid credentials!", 400);
        }
        identifier = identifier.toLowerCase();
        // Fetch user
        const user = await db_1.prisma.user.findFirst({
            where: {
                OR: [{ email: identifier }, { username: identifier }],
            },
        });
        // Check if user exists
        if (!user) {
            throw new error_handler_1.default("Invalid credentials!", 400);
        }
        // Check if password is correct
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new error_handler_1.default("Invalid credentials!", 400);
        }
        const token = await (0, auth_util_1.sign)({ id: user.id });
        const cookie = `token=${token}; HttpOnly; Max-Age=${env_config_1.default.jwt.expiresIn}`;
        res.setHeader("Set-Cookie", cookie);
        return new response_handler_1.default(res).success("Login successful!", {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        }, 200, {});
    }
    catch (e) {
        return new response_handler_1.default(res, e).error(e.message, {}, e === null || e === void 0 ? void 0 : e.status, {});
    }
});
exports.default = login;
