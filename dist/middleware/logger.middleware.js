"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const logger = (options) => async (req, res, next) => {
    const start = new Date().getTime();
    // Get response properties
    const { statusCode } = res;
    next();
    const end = new Date().getTime();
    //  Total time taken
    const diff = end - start;
    // Get request properties
    const { body, params, query, method, hostname, headers, baseUrl, originalUrl, protocol, httpVersion, } = req;
    // Get allowed options
    const { allowed } = options || {
        allowed: ["status", "protocol", "path", "method"],
    };
    // Check if log mode is enabled
    const { log } = options || { log: false };
    // Get format
    let { format } = options || { format: "" };
    // Force status to be allowed
    if (!(allowed === null || allowed === void 0 ? void 0 : allowed.includes("status"))) {
        allowed === null || allowed === void 0 ? void 0 : allowed.push("status");
    }
    // ONLY log if log mode is enabled
    if (log) {
        // Check if option is allowed
        const isAllowed = (option) => {
            if (allowed && allowed.includes(option)) {
                return log[option];
            }
            return "";
        };
        // Log object
        const log = {
            status: chalk_1.default.yellowBright(statusCode.toString()),
            host: `- ${(headers === null || headers === void 0 ? void 0 : headers.host) || hostname} -`,
            method: chalk_1.default.blue.bold(`[${method}]`),
            protocol: protocol.toUpperCase() + " " + httpVersion,
            path: chalk_1.default.green.bold(baseUrl),
            body: `\n${chalk_1.default.bold("body")}: ${JSON.stringify(body)}`,
            headers: `\n${chalk_1.default.bold("headers")}: ${JSON.stringify(headers)}`,
            query: `\n${chalk_1.default.bold("query")}: ${JSON.stringify(query)}`,
            params: `\n${chalk_1.default.bold("params")}: ${JSON.stringify(params)}`,
            url: `\n${chalk_1.default.bold("url")}: ${protocol}://${(headers === null || headers === void 0 ? void 0 : headers.host) || hostname}${originalUrl}`,
            time: " - " + (diff > 800 ? chalk_1.default.red(`${diff}ms`) : `${diff}ms`),
            date: `[${chalk_1.default.bold(new Date().toLocaleString())}]`,
        };
        if (!format) {
            console.log(`${isAllowed("date")} ${isAllowed("status")} ${isAllowed("method")} ${isAllowed("protocol")} ${isAllowed("host")} ${isAllowed("path")} ${isAllowed("time")} ${isAllowed("url")} ${isAllowed("body")} ${isAllowed("headers")} ${isAllowed("params")} ${isAllowed("query")}`);
        }
        else {
            format = format === null || format === void 0 ? void 0 : format.toLowerCase();
            // Replace format with allowed options
            Object.keys(log).forEach((key) => {
                format = format === null || format === void 0 ? void 0 : format.replace(`[${key.toLowerCase()}]`, log[key]);
            });
            console.log(format);
        }
    }
};
exports.logger = logger;
