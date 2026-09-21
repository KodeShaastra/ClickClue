import express, {type Express, Request, Response} from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import { env } from "./config/env.js";

export const app: Express = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:env.FRONTEND_URL
}))

app.get("/health-check",(req:Request,res:Response)=>{
    return res.status(200).json(
        {
            success:true,
            message:"Api is working"
        }
    )
})