"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const response_handler_1 = __importDefault(require("../../utils/handlers/response.handler"));
const error_handler_1 = __importDefault(require("../../utils/handlers/error.handler"));
const create = async (req, res) => {
    try {
        let { title, content } = req.body;
        let userId = req.user.id;
        const note = new client_1.PrismaClient().note;
        // If no title or content is provided, throw an error
        if (!(title && content)) {
            throw new error_handler_1.default("Title and content are required!", 400);
        }
        // Create a new note
        const newNote = await note.create({
            data: {
                title,
                content,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        if (!newNote) {
            throw new error_handler_1.default("Something went wrong!", 500);
        }
        // Return the new note
        return new response_handler_1.default(res).success("New note created!", newNote, 201);
    }
    catch (e) {
        return new response_handler_1.default(res, e).error(e.message, {}, e === null || e === void 0 ? void 0 : e.status, {});
    }
};
exports.default = create;
