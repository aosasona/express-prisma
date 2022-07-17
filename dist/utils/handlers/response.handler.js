"use strict";
/**
 * @description Response handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
class CustomResponse {
    constructor(res, error) {
        this.res = res;
        this.exception = error || new Error();
    }
    // Send success response with status code and data
    success(message = "", data = {}, statusCode = 200, meta = {}) {
        return this.res.status(statusCode || 200).json({
            success: true,
            status: statusCode || 200,
            message,
            data,
            meta,
        });
    }
    // Send error response with status code and error message
    error(message = "", data = {}, statusCode = 500, meta = {}) {
        var _a, _b;
        return this.res.status(statusCode || 500).json({
            success: false,
            status: ((_a = this === null || this === void 0 ? void 0 : this.exception) === null || _a === void 0 ? void 0 : _a.name.toLowerCase()) === "customerror"
                ? statusCode || 500
                : 500,
            message: ((_b = this === null || this === void 0 ? void 0 : this.exception) === null || _b === void 0 ? void 0 : _b.name.toLowerCase()) === "customerror"
                ? message
                : "Server error!",
            data,
            meta,
        });
    }
}
exports.default = CustomResponse;
