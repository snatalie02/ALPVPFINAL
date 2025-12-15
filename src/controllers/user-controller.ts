import { Request, Response, NextFunction } from "express" // router yang lebih kecil
import { UserService } from "../services/user-service"


export class UserController {

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.register(req.body)
      res.status(200).json({ data: response })
      // status(200) : work
      // send body response json "data" : {"token" : "" }
    } catch (error) {
      next(error)
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {

      const response = await UserService.login(req.body)
      res.status(200).json({ data: response })
    } catch (error) {
      next(error)
    }
  }
}