import { Request, Response } from "express";
import { RegisterUserDto } from "./auth.schema.js";
import { registerUser } from "./auth.service.js";
export const registerUserController = async (req: Request, res: Response)=>{
    // req.body was already checked by validate() in the route
    const data: RegisterUserDto = req.body

    // next step: const user = await registerUserService(data)
    const user = await registerUser(data)

    return res.status(201).json({
        success:true,
        message: "User registered successfully",
        data: user
    })
}
