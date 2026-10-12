import bcrypt from "bcryptjs";
import { AppError } from "../../lib/AppError.js";
import { createUser, findUserByEmail, findUserByUsername } from "./auth.repository.js";
import { RegisterUserDto } from "./auth.schema.js";


export const registerUser = async(data: RegisterUserDto)=>{
    
    const existingUser = await findUserByEmail(data.email)
    const existingUsername = await findUserByUsername(data.username)

    if(existingUser){
        throw new AppError(409,"Email already in use")
    }
    if(existingUsername){
        throw new AppError(409,"Username already in use")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = await createUser({
        ...data,
        password: hashedPassword
    })

    return newUser
}