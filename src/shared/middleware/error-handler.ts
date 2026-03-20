import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { AppError } from "../errors/app-error";
import { sendError } from "../http/api-response";

type MappedError = {
  message: string;
  code: string;
  statusCode: number;
};

function mapPrismaError(error: unknown): MappedError | null {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return {
        message: "Conflito de dados",
        code: "DB_UNIQUE_CONSTRAINT",
        statusCode: 409
      };
    }

    if (error.code === "P2021") {
      return {
        message: "Schema de banco de dados desatualizado",
        code: "DB_SCHEMA_OUTDATED",
        statusCode: 500
      };
    }

    return {
      message: "Falha na operacao de banco de dados",
      code: "DATABASE_OPERATION_FAILED",
      statusCode: 500
    };
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      message: "Banco de dados indisponivel",
      code: "DATABASE_UNAVAILABLE",
      statusCode: 503
    };
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      message: "Payload invalido para operacao de banco",
      code: "DATABASE_VALIDATION_ERROR",
      statusCode: 400
    };
  }

  return null;
}

function logError(error: unknown, request: Request) {
  const requestId = responseRequestId(request);

  const payload = {
    level: "error",
    requestId,
    method: request.method,
    path: request.originalUrl,
    message: error instanceof Error ? error.message : "Unknown error",
    stack: error instanceof Error ? error.stack : undefined
  };

  console.error(JSON.stringify(payload));
}

function responseRequestId(request: Request): string | undefined {
  return request.header("x-request-id") ?? (request.res?.locals.requestId as string | undefined);
}

export function errorHandler(
  error: unknown,
  request: Request,
  response: Response,
  _next: NextFunction
) {
  logError(error, request);

  if (error instanceof AppError) {
    return sendError(response, {
      message: error.message,
      code: error.code,
      details: error.details,
      statusCode: error.statusCode
    });
  }

  const prismaError = mapPrismaError(error);

  if (prismaError) {
    return sendError(response, {
      message: prismaError.message,
      code: prismaError.code,
      details: {
        requestId: responseRequestId(request)
      },
      statusCode: prismaError.statusCode
    });
  }

  return sendError(response, {
    message: "Unexpected error",
    code: "UNEXPECTED_ERROR",
    details: {
      requestId: responseRequestId(request)
    },
    statusCode: 500
  });
}
