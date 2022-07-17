"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const response_handler_1 = __importDefault(require("../../utils/handlers/response.handler"));
const error_handler_1 = __importDefault(require("../../utils/handlers/error.handler"));
const all = async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await new client_1.PrismaClient().note.findMany({
            where: {
                userId,
            },
        });
        if (notes.length === 0) {
            throw new error_handler_1.default("No notes found!", 404);
        }
        return new response_handler_1.default(res).success("Fetched all notes", notes, 200, {});
    }
    catch (e) {
        console.log(e);
        return new response_handler_1.default(res, e).error(e === null || e === void 0 ? void 0 : e.message, {}, e === null || e === void 0 ? void 0 : e.status, {});
    }
};
const one = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const noteId = parseInt(id, 10);
        const note = await new client_1.PrismaClient().note.findFirst({
            where: {
                id: noteId,
                userId,
            },
        });
        if (!note) {
            throw new error_handler_1.default("Note not found!", 404);
        }
        return new response_handler_1.default(res).success("Fetched one note", note, 200, {});
    }
    catch (e) {
        return new response_handler_1.default(res, e).error(e === null || e === void 0 ? void 0 : e.message, {}, e === null || e === void 0 ? void 0 : e.status, {});
    }
};
const fetch = {
    all,
    one,
};
exports.default = fetch;
