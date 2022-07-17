"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_controller_1 = __importDefault(require("./create.controller"));
const login_controller_1 = __importDefault(require("./login.controller"));
const auth = {
    create: create_controller_1.default,
    login: login_controller_1.default,
};
exports.default = auth;
