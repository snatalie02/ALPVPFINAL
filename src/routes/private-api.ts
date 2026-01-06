import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { FriendsController } from "../controllers/friends-controller"
import { WorkoutController } from "../controllers/workout-controller"

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

// LOGIC ROUTES FRIEND
privateRouter.post("/friends/add", FriendsController.addFriend)
privateRouter.get("/friends/list", FriendsController.getFriends)
privateRouter.get("/friends/suggestions", FriendsController.getSuggestions)
privateRouter.get("/friends/search", FriendsController.search);

privateRouter.get("/workouts/list", WorkoutController.list)
privateRouter.post("/workouts", WorkoutController.add)
privateRouter.get("/workouts/history", WorkoutController.history)
