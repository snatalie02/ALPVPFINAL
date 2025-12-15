"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth-middleware");
const friends_controller_1 = require("../controllers/friends-controller");
exports.privateRouter = express_1.default.Router();
exports.privateRouter.use(auth_middleware_1.authMiddleware);
exports.privateRouter.post("/friends/add", friends_controller_1.FriendsController.addFriend);
exports.privateRouter.get("/friends/list", friends_controller_1.FriendsController.getFriends);
exports.privateRouter.get("/friends/suggestions", friends_controller_1.FriendsController.getSuggestions);
exports.privateRouter.get("/friends/search", friends_controller_1.FriendsController.search);
