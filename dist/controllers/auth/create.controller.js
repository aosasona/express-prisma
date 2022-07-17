"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../services/db");
const validator_1 = __importDefault(require("validator"));
const error_handler_1 = __importDefault(require("../../utils/handlers/error.handler"));
const response_handler_1 = __importDefault(require("../../utils/handlers/response.handler"));
const create = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        let { username, email, password, confirmPassword } = req.body;
        // If username, email or password is not provided, throw error
        if (!(username && email && password && confirmPassword)) {
            throw new error_handler_1.default("All fields are required", 400);
        }
        username = username.trim().toLowerCase();
        email = email.trim().toLowerCase();
        password = password.trim();
        confirmPassword = confirmPassword.trim();
        // Check if email is valid
        if (!validator_1.default.isEmail(email)) {
            throw new error_handler_1.default("Email is invalid", 400);
        }
        // Check if password is at least 6 characters long
        if (password.length < 6) {
            throw new error_handler_1.default("Password must be at least 6 characters long", 400);
        }
        // Check if username is at least 3 characters long and is ASCII
        if (!validator_1.default.isAscii(username) || username.length < 3) {
            throw new error_handler_1.default("Username is invalid!", 400);
        }
        // Check if passwords match
        if (password !== confirmPassword) {
            throw new error_handler_1.default("Passwords do not match", 400);
        }
        // Check if username is already taken
        const checkUsername = await db_1.prisma.user.count({
            where: {
                username,
            },
        });
        if (checkUsername > 0) {
            throw new error_handler_1.default("Username is already taken", 400);
        }
        // Check if email is already taken
        const checkEmail = await db_1.prisma.user.count({
            where: {
                email,
            },
        });
        if (checkEmail > 0) {
            throw new error_handler_1.default("Email is already registered!", 400);
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await db_1.prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        if (!user) {
            throw new error_handler_1.default("User could not be created", 400);
        }
        return new response_handler_1.default(res).success("User created successfully", { id: user.id, username: user.username, email: user.email }, 201, {});
    }
    catch (e) {
        return new response_handler_1.default(res, e).error(e.message, {}, e.status);
    }
});
exports.default = create;
