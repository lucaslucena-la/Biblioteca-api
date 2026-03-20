import { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

const REQUEST_ID_HEADER = "x-request-id";

export function requestIdMiddleware(request: Request, response: Response, next: NextFunction) {
  const incomingRequestId = request.header(REQUEST_ID_HEADER);
  const requestId = incomingRequestId && incomingRequestId.trim().length > 0 ? incomingRequestId : randomUUID();

  response.locals.requestId = requestId;
  response.setHeader(REQUEST_ID_HEADER, requestId);

  return next();
}
