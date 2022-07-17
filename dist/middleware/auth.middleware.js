"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const auth_util_1 = require("../utils/auth.util");
const error_handler_1 = __importDefault(require("../utils/handlers/error.handler"));
const response_handler_1 = __importDefault(require("../utils/handlers/response.handler"));
const authMiddleware = async (req, res, next) => {
    var _a;
    try {
        const Authorization = (req === null || req === void 0 ? void 0 : req.cookies["Authorization"]) ||
            ((_a = req === null || req === void 0 ? void 0 : req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1]) ||
            null;
        if (Authorization) {
            const User = new client_1.PrismaClient().user;
            const verificationData = (await (0, auth_util_1.verify)(Authorization));
            const userId = parseInt(verificationData.id, 10);
            const currentUser = await User.findUnique({
                where: {
                    id: userId,
                },
            });
            if (currentUser) {
                req.user = currentUser;
                next();
            }
            else {
                throw new error_handler_1.default("Invalid credentials!", 400);
            }
        }
        else {
            throw new error_handler_1.default("Invalid credentials!", 400);
        }
    }
    catch (e) {
        // console.log(e);
        return new response_handler_1.default(res, e).error(e.message, {}, e === null || e === void 0 ? void 0 : e.status, {});
    }
};
exports.default = authMiddleware;
