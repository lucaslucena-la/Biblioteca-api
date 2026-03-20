import jwt from "jsonwebtoken";

import { UserRole } from "../../modules/usuarios/domain/usuario.entity";
import { AppError } from "../errors/app-error";

export type AuthTokenPayload = {
  id: string;
  role: UserRole;
};

const DEFAULT_EXPIRES_IN = "1h";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new AppError({
      message: "JWT_SECRET nao configurado",
      code: "JWT_SECRET_NOT_CONFIGURED",
      statusCode: 500
    });
  }

  return secret;
}

function getJwtExpiresIn(): jwt.SignOptions["expiresIn"] {
  return (process.env.JWT_EXPIRES_IN ?? DEFAULT_EXPIRES_IN) as jwt.SignOptions["expiresIn"];
}

export function signAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: getJwtExpiresIn()
  });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  try {
    const decoded = jwt.verify(token, getJwtSecret());

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.id !== "string" ||
      (decoded.role !== "USER" && decoded.role !== "LIBRARIAN")
    ) {
      throw new AppError({
        message: "Token invalido",
        code: "AUTH_TOKEN_INVALID",
        statusCode: 401
      });
    }

    return {
      id: decoded.id,
      role: decoded.role
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError({
        message: "Token expirado",
        code: "AUTH_TOKEN_EXPIRED",
        statusCode: 401
      });
    }

    throw new AppError({
      message: "Token invalido",
      code: "AUTH_TOKEN_INVALID",
      statusCode: 401
    });
  }
}
