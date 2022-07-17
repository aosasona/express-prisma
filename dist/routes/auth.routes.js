"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//  Import Controller
const controllers_1 = require("../controllers");
router.post("/create", controllers_1.auth.create);
router.post("/login", controllers_1.auth.login);
exports.default = router;
