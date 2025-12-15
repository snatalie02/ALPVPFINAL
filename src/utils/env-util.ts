import dotenv from "dotenv"
dotenv.config()

export const PORT = process.env.PORT as string // calling "3000" with port
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret_key" // caling secret key with JWT_SECRET_KEY
