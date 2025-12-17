import { ZodType } from "zod"

export class Validation {
  static validate<T>(schema: ZodType, data: T): T {
    // schema : user-validation, data :request (username,password)
    return schema.parse(data) as T
    // if data valid returns data, as T : tells TypeScript the output is the same type as input
    // if not throws an error messages defined in the schemas
  }
}
