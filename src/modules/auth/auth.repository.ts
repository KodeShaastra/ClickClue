import { prisma } from "../../config/db.js"
import { RegisterUserDto } from "./auth.schema.js"

// Only database code lives here.
// No checks, no hashing, no errors — that is the service's job.

// The fields we are allowed to send back to the user (never the password)
const safeUserFields = {
    id: true,
    username: true,
    email: true,
    createdAt: true,
}

// Returns the full user (with password), or null if not found.
// The service needs the password later for login.
export const findUserByEmail = (email: string) => {
    return prisma.user.findUnique({ where: { email } })
}

export const findUserByUsername = (username: string) => {
    return prisma.user.findUnique({ where: { username } })
}

// The password must already be hashed by the service before it reaches here.
export const createUser = (data: RegisterUserDto) => {
    return prisma.user.create({
        data,
        select: safeUserFields,
    })
}
