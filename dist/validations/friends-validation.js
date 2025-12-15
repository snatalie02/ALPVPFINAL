"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsValidation = void 0;
const zod_1 = require("zod");
class FriendsValidation {
}
exports.FriendsValidation = FriendsValidation;
FriendsValidation.ADD_FRIEND = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: "Username is required" })
});
