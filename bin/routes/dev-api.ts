// // src/routes/dev-api.ts
// import express from "express"
// import { DevController } from "../controllers/dev-controller"

// export const devRouter = express.Router()

// devRouter.post("/streak/reset", DevController.resetStreak)

import express from "express"
import { DevController } from "../controllers/dev-controller"
import { authMiddleware } from "../middlewares/auth-middleware"

export const devRouter = express.Router()

// OPTIONAL (disarankan): tetap pakai auth
devRouter.use(authMiddleware)

devRouter.post("/fake-new-day", DevController.fakeNewDay)
