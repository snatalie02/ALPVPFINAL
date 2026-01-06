//jalan --> routes

import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { FriendsController } from "../controllers/friends-controller"
import { StreakController } from "../controllers/streak-controller"
import { WorkoutController } from "../controllers/workout-controller"

export const privateRouter = express.Router()

privateRouter.use(authMiddleware) //cek tokennya dulu

// LOGIC ROUTES FRIEND
privateRouter.post("/friends/add", FriendsController.addFriend)
privateRouter.get("/friends/list", FriendsController.getFriends)
privateRouter.get("/friends/suggestions", FriendsController.getSuggestions)
privateRouter.get("/friends/search", FriendsController.search)

// 🔥 LOGIC ROUTES STREAK (NEW!)
privateRouter.post("/streak/checkin", StreakController.checkIn)
privateRouter.get("/streak/status/:friendId", StreakController.getStreakStatus)
privateRouter.get("/streak/all", StreakController.getAllStreaks)
privateRouter.post("/streak/reset", StreakController.resetDailyFlags) // For cron job
privateRouter.get("/friends/search", FriendsController.search);

privateRouter.get("/workouts/list", WorkoutController.list)
privateRouter.post("/workouts", WorkoutController.add)
privateRouter.get("/workouts/history", WorkoutController.history)
