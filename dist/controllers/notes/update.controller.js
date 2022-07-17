"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const response_handler_1 = __importDefault(require("../../utils/handlers/response.handler"));
const error_handler_1 = __importDefault(require("../../utils/handlers/error.handler"));
const update = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        let { title, content } = req.body;
        if (!title && !content) {
            throw new error_handler_1.default("No data to update!", 400);
        }
        const noteId = parseInt(id, 10);
        let note = await new client_1.PrismaClient().note.findFirst({
            where: {
                id: noteId,
                userId,
            },
        });
        if (!note) {
            throw new error_handler_1.default("Note not found!", 404);
        }
        if (title) {
            note.title = title;
        }
        if (content) {
            note.content = content;
        }
        const updateNote = await new client_1.PrismaClient().note.update({
            where: {
                id: noteId,
            },
            data: {
                title: note.title,
                content: note.content,
            },
        });
        if (!updateNote) {
            throw new error_handler_1.default("Note not updated!", 400);
        }
        return new response_handler_1.default(res).success(`Updated note ${note.id}`, updateNote, 200, {});
    }
    catch (e) {
        return new response_handler_1.default(res, e).error(e === null || e === void 0 ? void 0 : e.message, {}, e === null || e === void 0 ? void 0 : e.status, {});
    }
};
exports.default = update;
