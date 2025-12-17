import { z, ZodType } from "zod"

export class FriendsValidation {
  static readonly ADD_FRIEND: ZodType = z.object({
    username: z.string().min(1, { message: "Username is required" })
    // If req.body has no username or an empty string, Zod will throw a validation error : Checks if req.username exists.
    // Checks if it is a non-empty string.
    // Returns validated object with username guaranteed to be valid.
  })
}
