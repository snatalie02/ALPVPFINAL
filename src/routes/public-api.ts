import express from "express"
import { UserController } from "../controllers/user-controller"

// LOGIC ROUTES LOGIN & REGISTER
export const publicRouter = express.Router()

publicRouter.post("/register", UserController.register)
publicRouter.post("/login", UserController.login)