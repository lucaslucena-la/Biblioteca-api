import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error";
import { sendError } from "../http/api-response";

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return sendError(response, {
      message: error.message,
      code: error.code,
      details: error.details,
      statusCode: error.statusCode
    });
  }

  return sendError(response, {
    message: "Unexpected error",
    code: "UNEXPECTED_ERROR",
    statusCode: 500
  });
}
