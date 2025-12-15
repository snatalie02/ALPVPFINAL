"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
// import * as jwt from "jsonwebtoken"
const jwt = require("jsonwebtoken");
const env_util_1 = require("./env-util");
const generateToken = (payload, expiry = "1h") => {
    return jwt.sign(payload, env_util_1.JWT_SECRET_KEY || "secret_key", {
        expiresIn: expiry,
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jwt.verify(token, env_util_1.JWT_SECRET_KEY || "secret_key");
};
exports.verifyToken = verifyToken;
