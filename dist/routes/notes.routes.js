"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const index_1 = require("../controllers/index");
router.get("/", index_1.notes.fetch.all);
router.get("/:id", index_1.notes.fetch.one);
router.post("/create", index_1.notes.create);
router.delete("/:id", index_1.notes.del);
router.put("/:id", index_1.notes.update);
exports.default = router;
