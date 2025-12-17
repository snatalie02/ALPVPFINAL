import { Request, Response, NextFunction } from "express"
import { StreakService } from "../services/streak-service"

export class StreakController {
  
  // POST /api/private/streak/checkin
  static async checkIn(req: Request & { user?: any }, res: Response, next: NextFunction) {
    try {
      const currentUser = req.user // From auth middleware
      const response = await StreakService.checkIn(currentUser.id, req.body)
      res.status(200).json({ data: response })
    } catch (error) {
      next(error)
    }
  }

  // GET /api/private/streak/status/:friendId
  static async getStreakStatus(req: Request & { user?: any }, res: Response, next: NextFunction) {
    try {
      const currentUser = req.user
      const friendId = parseInt(req.params.friendId)
      
      if (isNaN(friendId)) {
        return res.status(400).json({ error: "Invalid friend ID" })
      }

      const response = await StreakService.getStreakStatus(currentUser.id, friendId)
      res.status(200).json({ data: response })
    } catch (error) {
      next(error)
    }
  }

  // GET /api/private/streak/all
  static async getAllStreaks(req: Request & { user?: any }, res: Response, next: NextFunction) {
    try {
      const currentUser = req.user
      const response = await StreakService.getAllStreaks(currentUser.id)
      res.status(200).json({ data: response })
    } catch (error) {
      next(error)
    }
  }

  // POST /api/private/streak/reset (Admin only - for daily cron job)
  static async resetDailyFlags(req: Request, res: Response, next: NextFunction) {
    try {
      await StreakService.resetDailyStreakFlags()
      res.status(200).json({ message: "Daily streak flags reset successfully" })
    } catch (error) {
      next(error)
    }
  }
}