// src/config/env.ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4001),
  DATABASE_URL: z.url(),
  FRONTEND_URL: z.url(),
  JWT_ACCESS_TOKEN_SECRET: z.string().min(6),
  JWT_REFRESH_TOKEN_SECRET: z.string().min(6),
  JWT_ACCESS_TOKEN_EXPIRY: z.string().default("15m"),
  JWT_REFRESH_TOKEN_EXPIRY: z.string().default("7d")
});

export const env = envSchema.parse(process.env);