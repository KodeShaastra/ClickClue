import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";

const ACCESS_TOKEN_SECRET = env.JWT_ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = env.JWT_REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRY = env.JWT_ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"];
const REFRESH_TOKEN_EXPIRY = env.JWT_REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"];

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

export const generateRefreshToken = (userId: string)=>{
  return jwt.sign({userId}, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRY})
}

export const verifyAccessToken = (token: string)=>{
  return jwt.verify(token, ACCESS_TOKEN_SECRET)
}

export const verifyRefreshToken =(token: string)=>{
  return jwt.verify(token, REFRESH_TOKEN_SECRET)
}

// Reads the expiry time stored inside a token (set by expiresIn when it was signed)
export const getTokenExpiry = (token: string) => {
  const { exp } = jwt.decode(token) as JwtPayload
  return new Date(exp! * 1000)
}