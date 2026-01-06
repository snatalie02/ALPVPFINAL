// // src/controllers/dev-controller.ts
// import { Request, Response } from "express"
// import { StreakService } from "../services/streak-service"

// export class DevController {
//   static async resetStreak(req: Request, res: Response) {
//     await StreakService.resetDailyStreakFlags()
//     res.json({ message: "DEV: streak flags reset" })
//   }
// }

import { Request, Response, NextFunction } from "express"
import { prismaClient } from "../utils/database-util"

export class DevController {
  // POST /api/dev/fake-new-day
  static async fakeNewDay(req: Request, res: Response, next: NextFunction) {
    try {
      await prismaClient.friends.updateMany({
        data: {
          has_set_streak_today: false
        }
      })

      res.status(200).json({
        message: "✅ Fake new day applied. All streaks reset for today."
      })
    } catch (error) {
      next(error)
    }
  }
}
