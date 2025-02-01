import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, ZodIssue } from "zod";
import { ApiResponse } from "../types/api/response";

// Error-handling middleware
export const errorHandlerMiddleware = (
  err: unknown,
  _: Request,
  res: Response<ApiResponse<unknown, ZodIssue, "errors">>,
  __: NextFunction
): void => {
  console.log("Error handler middleware called", err);
  if (err instanceof ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter the details correctly and then retry.",
      errors: err.issues,
      success: false,
    });
    return;
  }

  // Handle other errors (default 500)
  console.error(err);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Sorry, something went wrong on the server. Please try again.",
    errors: [],
  });
};
