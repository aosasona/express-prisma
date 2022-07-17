"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const hpp_1 = __importDefault(require("hpp"));
const toobusy_js_1 = __importDefault(require("toobusy-js"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const scrawny_1 = __importDefault(require("scrawny"));
const app = (0, express_1.default)();
//APP MIDDLE-WARES
// Middleware
if (process.env.NODE_ENV === "production") {
    app.use((0, helmet_1.default)());
}
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, hpp_1.default)());
app.use((0, compression_1.default)());
app.disable("x-powered-by");
//APP ROUTES - IMPORT
const routes_1 = __importDefault(require("./routes"));
// TOO BUSY
app.use((req, res, next) => {
    if ((0, toobusy_js_1.default)()) {
        return res.status(429).send("Too busy!");
    }
    next();
});
// SCRAWNY
app.use((0, scrawny_1.default)({
    log: process.env.NODE_ENV !== "production",
    format: "[METHOD] [URL] [TIME]",
}));
app.use("/", routes_1.default);
exports.default = app;
