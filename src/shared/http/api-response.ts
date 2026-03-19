import { Response } from "express";

type SuccessPayload<T> = {
  message: string;
  data: T;
  meta?: Record<string, unknown>;
  statusCode?: number;
};

type ErrorPayload = {
  message: string;
  code?: string;
  details?: unknown;
  statusCode?: number;
};

export function sendSuccess<T>(response: Response, payload: SuccessPayload<T>) {
  const { message, data, meta, statusCode = 200 } = payload;

  return response.status(statusCode).json({
    success: true,
    message,
    data,
    meta
  });
}

export function sendError(response: Response, payload: ErrorPayload) {
  const { message, code = "INTERNAL_ERROR", details, statusCode = 500 } = payload;

  return response.status(statusCode).json({
    success: false,
    message,
    error: {
      code,
      details
    }
  });
}
