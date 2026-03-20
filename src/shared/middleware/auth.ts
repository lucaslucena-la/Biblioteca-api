import { NextFunction, Request, Response } from "express";

import { UserRole } from "../../modules/usuarios/domain/usuario.entity";
import { AppError } from "../errors/app-error";
import { verifyAuthToken } from "../auth/jwt";

export type AuthenticatedUser = {
  id: string;
  role: UserRole;
};

type RequestWithAuth = Request & {
  authUser?: AuthenticatedUser;
};

function extractBearerToken(request: Request): string {
  const authHeader = request.header("authorization");

  if (!authHeader) {
    throw new AppError({
      message: "Token nao informado",
      code: "AUTH_TOKEN_MISSING",
      statusCode: 401
    });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError({
      message: "Token invalido",
      code: "AUTH_TOKEN_INVALID",
      statusCode: 401
    });
  }

  return token;
}

export function authMiddleware(request: Request, _response: Response, next: NextFunction) {
  const token = extractBearerToken(request);
  const payload = verifyAuthToken(token);

  (request as RequestWithAuth).authUser = {
    id: payload.id,
    role: payload.role
  };

  return next();
}

export function getAuthUser(request: Request): AuthenticatedUser {
  const authUser = (request as RequestWithAuth).authUser;

  if (!authUser) {
    throw new AppError({
      message: "Nao autenticado",
      code: "UNAUTHENTICATED",
      statusCode: 401
    });
  }

  return authUser;
}

export function requireRole(...allowedRoles: UserRole[]) {
  return (request: Request, _response: Response, next: NextFunction) => {
    const authUser = getAuthUser(request);

    if (!allowedRoles.includes(authUser.role)) {
      throw new AppError({
        message: "Acesso negado",
        code: "FORBIDDEN",
        statusCode: 403
      });
    }

    return next();
  };
}
