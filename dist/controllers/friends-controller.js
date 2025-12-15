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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsController = void 0;
const friends_service_1 = require("../services/friends-service");
class FriendsController {
    static addFriend(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.user;
                const response = yield friends_service_1.FriendsService.addFriend(currentUser.id, req.body);
                res.status(200).json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getFriends(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.user;
                const response = yield friends_service_1.FriendsService.getFriends(currentUser.id);
                res.status(200).json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getSuggestions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.user;
                const response = yield friends_service_1.FriendsService.getSuggestions(currentUser.id);
                res.status(200).json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usernameQuery = req.query.username;
                const users = yield friends_service_1.FriendsService.searchUsers(usernameQuery);
                res.json({
                    data: users,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.FriendsController = FriendsController;
