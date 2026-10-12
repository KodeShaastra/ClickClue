import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { env } from "../config/env.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // bad input from the user (thrown by schema.parse) → 400 with a list of what's wrong
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid input",
      errors: z.flattenError(err).fieldErrors,
    });
  }

  let error = { ...err };
  error.message = err.message;

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (env.NODE_ENV === "development") {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: err.stack,
      error,
    });
  }
  //production error handling
  if (error.isOperational) {
    return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    })
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong!"
  })
};
