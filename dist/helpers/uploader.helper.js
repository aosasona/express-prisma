"use strict";
// Multer file uploader helper
// Language: typescript
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path_1.default.join(__dirname, "../uploads");
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    // fileFilter: (req, file, cb) => {
    //     // reject a file
    //     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    //         cb(null, true);
    //     } else {
    //         cb(null, false);
    //     }
    // }
});
module.exports = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
