import { prisma } from "../../config/db.js"
import { RegisterUserDto } from "./auth.schema.js"

// Only database code lives here.
// No checks, no hashing, no errors — that is the service's job.
// Functions here return the full user (with password).
// The service removes the password with toUserResponse() before sending it back.

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
    return prisma.user.create({ data })
}

export const createRefreshToken = (data:{
    token: string,
    userId: string,
    expireAt: Date
})=>{
    return prisma.refreshToken.create({
        data
    })
}

