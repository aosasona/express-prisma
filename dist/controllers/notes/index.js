"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_controller_1 = __importDefault(require("./create.controller"));
const fetch_controller_1 = __importDefault(require("./fetch.controller"));
const delete_controller_1 = __importDefault(require("./delete.controller"));
const update_controller_1 = __importDefault(require("./update.controller"));
// TODO: ADD UPDATE ROUTE
const notes = {
    create: create_controller_1.default,
    update: update_controller_1.default,
    fetch: fetch_controller_1.default,
    del: delete_controller_1.default,
};
exports.default = notes;
