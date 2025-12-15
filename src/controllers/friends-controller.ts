import { Request, Response, NextFunction } from "express"
import { FriendsService } from "../services/friends-service"

export class FriendsController {

  static async getFriends(req: Request & { user?: any }, res: Response, next: NextFunction) {
                                        // middleware alrd set the user but if the middleware fail makes it undefined if no optional crash
                                        // current user id and username
    try {
      const currentUser = req.user // current user id and username
      const response = await FriendsService.getFriends(currentUser.id) // get all the friends and their infos
      // 200 success 
      res.status(200).json({ data: response })
    } catch (error) {
      next(error)
    }
  }

  static async getSuggestions(req: Request & { user?: any }, res: Response, next: NextFunction) {
    try {
      const currentUser = req.user
      const response = await FriendsService.getSuggestions(currentUser.id)
      res.status(200).json({ data: response })
    } catch (error) { 
      next(error)
    }
  }

}




