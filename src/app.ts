import express, {type Express, Request, Response} from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import { env } from "./config/env.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import authRouter from "./modules/auth/auth.route.js";

export const app: Express = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:env.FRONTEND_URL,
    credentials: true
}))

app.get("/health-check",(req:Request,res:Response)=>{
    return res.status(200).json(
        {
            success:true,
            message:"Api is working"
        }
    )
})

app.use("/api/v1/auth", authRouter)
app.use(globalErrorHandler)