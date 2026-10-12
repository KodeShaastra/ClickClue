import express, { Router } from "express";
import { registerUserController } from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { registerUserSchema } from "./auth.schema.js";
const router:Router = express.Router();

router.post("/register", validate(registerUserSchema), registerUserController)
export default router;
