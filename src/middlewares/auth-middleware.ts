import { NextFunction, Response, Request } from "express"
import { verifyToken } from "../utils/jwt-util"
import { ResponseError } from "../error/response-error"


export const authMiddleware = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
                                            // ? optional : first req.user undefined 
                                            // after req.user = payload (id:..., username:...)
                                            // req passed around the chain (later accessed in the friendscontroller)
  try {
    const authHeader = req.headers["authorization"] // get the "bearer token"
    // use [] not.authorization because headers are dynamic string keys, and TypeScript cannot guarantee a fixed .authorization property exists
    const token = authHeader && (authHeader as string).split(" ")[1]
    // get only the token to ditch the "bearer"
    if (!token) return next(new ResponseError(401, "Unauthorized user!"))
    // create new type of error (401, no token)

    const payload = verifyToken(token)
    // id : int ..., username : string ...
    if (!payload) return next(new ResponseError(401, "Unauthorized user!"))
    // create new type of error (401, invalid/expired token )

    req.user = payload // fill the req above
    next()
  } catch (error) {
    next(error)
  }
}
