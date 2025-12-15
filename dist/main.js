"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_util_1 = require("./utils/env-util");
const public_api_1 = require("./routes/public-api");
const private_api_1 = require("./routes/private-api");
const error_middleware_1 = require("./middlewares/error-middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", public_api_1.publicRouter);
app.use("/api/private", private_api_1.privateRouter);
app.use(error_middleware_1.errorMiddleware);
app.listen(env_util_1.PORT || 3000, () => console.log(`Server running on port ${env_util_1.PORT || 3000}`));
