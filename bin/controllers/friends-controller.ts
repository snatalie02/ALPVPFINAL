import { Request, Response, NextFunction } from "express"
import { FriendsService } from "../services/friends-service"

export class FriendsController {

  static async addFriend(req: Request & { user?: any }, res: Response, next: NextFunction) {
    try {                              // current user id and username
                                       // friend's username
      const currentUser = req.user // user's username 
      const response = await FriendsService.addFriend(currentUser.id, req.body) // body : friend's username 
      res.status(200).json({ data: response })
    } catch (error) {
      next(error)
    }
  }

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

  static async search(req: Request, res: Response, next: NextFunction) {
                      // req : diff from suggestion & friends : current user id & username 
                      // req contains what the user type (the username that searched)
    try {
      const usernameQuery = req.query.username as string;
      // get what the user typed as string
      const users = await FriendsService.searchUsers(usernameQuery);
      res.json({
        data: users,
      });
    } catch (e) {
      next(e);
    }
  }

}




