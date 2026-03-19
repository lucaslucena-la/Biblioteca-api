import { Request, Response } from "express";

import { sendError } from "../http/api-response";

export function notFoundHandler(_request: Request, response: Response) {
  return sendError(response, {
    message: "Route not found",
    code: "ROUTE_NOT_FOUND",
    statusCode: 404
  });
}
