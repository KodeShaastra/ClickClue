// src/config/env.ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4001),
  DATABASE_URL: z.url(),
  FRONTEND_URL: z.url()
});

export const env = envSchema.parse(process.env);