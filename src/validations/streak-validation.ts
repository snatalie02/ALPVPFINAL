import { z, ZodType } from "zod"

export class StreakValidation {
  static readonly CHECK_IN: ZodType = z.object({
    friend_id: z.number().int().positive({ message: "Friend ID must be a positive integer" })
  })
}