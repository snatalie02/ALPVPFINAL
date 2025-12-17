import { z, ZodType } from "zod"

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(1, { message: "Username can not be empty!" }),
    password: z.string().min(6, { message: "Password must have >= 6 chars" })
  })

  // static : no need to make new UserValidations()
  // readonly : value cannot be changed
  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1, { message: "Username can not be empty!" }),
    // must be a string, minimum 1 character
    // This defines the rules for login data
    password: z.string().min(6, { message: "Password must have >= 6 chars" })
  })
}