const jwt = require("jsonwebtoken")

import { JWT_SECRET_KEY } from "./env-util"
import { UserJWTPayload } from "../models/user-model" 

// export can import it in other file
export const generateToken = (
    payload: UserJWTPayload, // id : int, username : string
    expiry: string = "1h"
): string => {
    return jwt.sign(payload, JWT_SECRET_KEY || "secret_key", {
        expiresIn: expiry,
    })
    // jwt : Uses the jsonwebtoken library to create the token.
    // JWT_SECRET_KEY : secret key used to sign the token (must be kept secret!).
}

export const verifyToken = (token: string): UserJWTPayload => {
    return jwt.verify(token, JWT_SECRET_KEY || "secret_key") as UserJWTPayload
    // Verifies the token using the secret key, Decodes the token payload if the token is valid.
    // if the JWT is wrong make it "secret_key"
    // making the output type of verify id : int, username : string 
} 
