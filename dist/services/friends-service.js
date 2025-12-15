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
exports.FriendsService = void 0;
const database_util_1 = require("../utils/database-util");
const response_error_1 = require("../error/response-error");
const validation_1 = require("../validations/validation");
const friends_validation_1 = require("../validations/friends-validation");
class FriendsService {
    static addFriend(currentUserId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validated = validation_1.Validation.validate(friends_validation_1.FriendsValidation.ADD_FRIEND, req);
            // find friend by username
            const friend = yield database_util_1.prismaClient.user.findUnique({ where: { username: validated.username } });
            if (!friend)
                throw new response_error_1.ResponseError(400, "User not found");
            if (friend.id === currentUserId)
                throw new response_error_1.ResponseError(400, "Cannot add yourself as friend");
            // Check already friends
            const exists = yield database_util_1.prismaClient.friends.findUnique({
                where: {
                    following_user_id_followed_user_id: {
                        following_user_id: currentUserId,
                        followed_user_id: friend.id
                    }
                }
            }).catch(() => null);
            if (exists)
                throw new response_error_1.ResponseError(400, "Already friends");
            // Create mutual friendship in a transaction
            yield database_util_1.prismaClient.$transaction([
                database_util_1.prismaClient.friends.create({
                    data: {
                        following_user_id: currentUserId,
                        followed_user_id: friend.id
                    }
                }),
                database_util_1.prismaClient.friends.create({
                    data: {
                        following_user_id: friend.id,
                        followed_user_id: currentUserId
                    }
                })
            ]);
            return "Friend added successfully (mutual)";
        });
    }
    static getFriends(currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const friends = yield database_util_1.prismaClient.friends.findMany({
                where: {
                    following_user_id: currentUserId
                },
                include: {
                    followed_user: true
                }
            });
            return friends.map(f => ({
                id: f.followed_user.id,
                username: f.followed_user.username,
                duration_streak: f.duration_streak,
                time_stamp: f.time_stamp
            }));
        });
    }
    static getSuggestions(currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. Get all friend IDs of current user
            const friendships = yield database_util_1.prismaClient.friends.findMany({
                where: { following_user_id: currentUserId },
                select: { followed_user_id: true }
            });
            const friendIds = friendships.map(f => f.followed_user_id);
            // 2. Query all users NOT in that list, and not current user
            const suggestions = yield database_util_1.prismaClient.user.findMany({
                where: {
                    id: {
                        not: currentUserId,
                        notIn: friendIds
                    }
                },
                select: {
                    id: true,
                    username: true
                }
            });
            return suggestions;
        });
    }
    static searchUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_util_1.prismaClient.user.findMany({
                where: {
                    username: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                select: {
                    id: true,
                    username: true,
                },
            });
        });
    }
}
exports.FriendsService = FriendsService;
