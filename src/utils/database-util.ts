import { PrismaClient } from "@prisma/client" 
export const prismaClient = new PrismaClient()
// new PrismaClient() = creates a connection object to the database.
// export const prismaClient = makes this same client available in other files.