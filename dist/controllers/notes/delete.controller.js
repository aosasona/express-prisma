"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const response_handler_1 = __importDefault(require("../../utils/handlers/response.handler"));
const error_handler_1 = __importDefault(require("../../utils/handlers/error.handler"));
const del = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const noteModel = new client_1.PrismaClient().note;
        const note = await noteModel.findFirst({
            where: {
                id: parseInt(id, 10),
                userId,
            },
        });
        if (note) {
            await noteModel.delete({
                where: {
                    id: parseInt(id, 10),
                },
            });
            return new response_handler_1.default(res).success("Note deleted successfully!", note, 200);
        }
        else {
            throw new error_handler_1.default("Note not found!", 404);
        }
    }
    catch (e) {
        return new response_handler_1.default(res, e).error(e.message, {}, e === null || e === void 0 ? void 0 : e.status, {});
    }
};
exports.default = del;
