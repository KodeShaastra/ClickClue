import { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = { ...err };
  error.message = err.message;

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (env.NODE_ENV === "development") {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: error.stack,
      error,
    });
  }
  //production error handling
  if (error.isOperational) {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    })
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong!"
  })
};
