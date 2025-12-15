"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_util_1 = require("../utils/database-util");
const validation_1 = require("../validations/validation");
const user_validation_1 = require("../validations/user-validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_util_1 = require("../utils/jwt-util");
const response_error_1 = require("../error/response-error");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validated = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            // check username uniqueness
            const existing = yield database_util_1.prismaClient.user.findUnique({ where: { username: validated.username } });
            if (existing)
                throw new response_error_1.ResponseError(400, "Username already exists");
            const hashed = yield bcrypt_1.default.hash(validated.password, 10);
            const user = yield database_util_1.prismaClient.user.create({
                data: {
                    username: validated.username,
                    password: hashed
                }
            });
            return { token: (0, jwt_util_1.generateToken)({ id: user.id, username: user.username }, "12h") };
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validated = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            const user = yield database_util_1.prismaClient.user.findUnique({ where: { username: validated.username } });
            if (!user)
                throw new response_error_1.ResponseError(400, "Invalid username or password");
            const isValid = yield bcrypt_1.default.compare(validated.password, user.password);
            if (!isValid)
                throw new response_error_1.ResponseError(400, "Invalid username or password");
            return { token: (0, jwt_util_1.generateToken)({ id: user.id, username: user.username }, "12h") };
        });
    }
}
exports.UserService = UserService;
