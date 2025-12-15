"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.REGISTER = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: "Username can not be empty!" }),
    password: zod_1.z.string().min(6, { message: "Password must have >= 6 chars" })
});
UserValidation.LOGIN = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: "Username can not be empty!" }),
    password: zod_1.z.string().min(6, { message: "Password must have >= 6 chars" })
});
