import { User } from "../../generated/prisma/client.js"

// The safe shape of a user we send back (never the password)
export interface UserResponseDto {
    id: string
    username: string
    email: string
    createdAt: Date
}

// Turns a user from the database into the safe shape we send back.
// Only the fields listed here are copied, so the password never leaves.
export const toUserResponse = (user: User): UserResponseDto => ({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
})