import { RegisterUserRequest, LoginUserRequest } from "../models/user-model"
import { prismaClient } from "../utils/database-util"
import { Validation } from "../validations/validation"
import { UserValidation } from "../validations/user-validation"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt-util"
import { ResponseError } from "../error/response-error"

export class UserService {

// REGISTER & LOGIN
  static async register(request: RegisterUserRequest) {
    const validated = Validation.validate(UserValidation.REGISTER, request)

    // check username uniqueness
    const existing = await prismaClient.user.findUnique({ where: { username: validated.username } })
    if (existing) throw new ResponseError(400, "Username already exists")

    // hash password
    const hashed = await bcrypt.hash(validated.password, 10)
    const user = await prismaClient.user.create({
      data: {
        username: validated.username,
        password: hashed
      }
    })

    return { token: generateToken({ id: user.id, username: user.username }, "12h") }
  }

  
  static async login(request: LoginUserRequest) { 
                            //LoginUserRequest : go to user-model contains username, password as strings
    const validated = Validation.validate(UserValidation.LOGIN, request)
                                        // go to UserValidation func login : This defines the rules for login data.
                    // Validation.validate : Zod checks if data matches the rules if yes -> returns the same object

    const user = await prismaClient.user.findUnique({ where: { username: validated.username } })
    // prismaclient : query find in table user data (id,username,pass(hashed)) 
    // where username (from db,unique) match the validated.username (typed username that is alrd validated)
    // if the name matched, username right
    if (!user) throw new ResponseError(400, "Invalid username or password")

    const isValid = await bcrypt.compare(validated.password, user.password)
    // compare the validated.password(typed password that is alrd validated) with the user.password (from db)
    if (!isValid) throw new ResponseError(400, "Invalid username or password")

    return { token: generateToken({ id: user.id, username: user.username }, "12h") }
    // token from id & username
    // Token expiry time: 12 hours in this case. After 12 hours, the token will no longer be valid
  }
}

