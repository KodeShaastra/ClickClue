import {z} from "zod"

export const registerUserSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.email("Invalid email address").toLowerCase(),
    // bcrypt only reads the first 72 bytes of a password
    password: z.string().min(6,"Password must be at least 6 characters long").max(72, "Password must be at most 72 characters long")
})

export type RegisterUserDto = z.infer<typeof registerUserSchema>