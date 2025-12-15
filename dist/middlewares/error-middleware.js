"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const response_error_1 = require("../error/response-error");
const errorMiddleware = (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({ errors: error.issues });
    }
    else if (error instanceof response_error_1.ResponseError) {
        res.status(error.status).json({ errors: error.message });
    }
    else {
        res.status(500).json({ errors: (error === null || error === void 0 ? void 0 : error.message) || String(error) });
    }
};
exports.errorMiddleware = errorMiddleware;
