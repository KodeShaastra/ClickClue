import { Request, Response } from "express";
import { RegisterUserDto } from "./auth.schema.js";
import { registerUser } from "./auth.service.js";
import { env } from "../../config/env.js";
import { getTokenExpiry } from "../../lib/jwt.helper.js";
import { sendResponse } from "../../lib/sendResponse.js";
export const registerUserController = async (req: Request, res: Response)=>{
    // req.body was already checked by validate() in the route
    const data: RegisterUserDto = req.body

    const {user, accessToken, refreshToken} = await registerUser(data)

    res.cookie("refreshToken", refreshToken,{
        httpOnly:true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        expires: getTokenExpiry(refreshToken),
    })

    return sendResponse(res, 201, "User registered successfully", { user, accessToken })
}
