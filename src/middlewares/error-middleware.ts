import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"
import { ResponseError } from "../error/response-error"

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).json({ errors: error.issues })
  } else if (error instanceof ResponseError) { 
    res.status(error.status).json({ errors: error.message })
  } else { // server error 5xx
    res.status(500).json({ errors: error?.message || String(error) })
  }
}
