"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_util_1 = require("../utils/jwt-util");
const response_error_1 = require("../error/response-error");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token)
            return next(new response_error_1.ResponseError(401, "Unauthorized user!"));
        const payload = (0, jwt_util_1.verifyToken)(token);
        if (!payload)
            return next(new response_error_1.ResponseError(401, "Unauthorized user!"));
        req.user = payload;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
