import { Request, Response } from "express";

import { sendSuccess } from "../../../shared/http/api-response";
import { getAuthUser } from "../../../shared/middleware/auth";
import { asyncHandler } from "../../../shared/middleware/async-handler";
import { validateWithSchema } from "../../../shared/validation/validate-with-zod";
import { loginSchema, registerSchema } from "../dto/auth.dto";
import { AuthService } from "../service/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = asyncHandler(async (request: Request, response: Response, _next) => {
    const payload = validateWithSchema(registerSchema, request.body);
    const result = await this.authService.register(payload);

    return sendSuccess(response, {
      message: "Usuario registrado com sucesso",
      data: result,
      statusCode: 201
    });
  });

  login = asyncHandler(async (request: Request, response: Response, _next) => {
    const payload = validateWithSchema(loginSchema, request.body);
    const result = await this.authService.login(payload);

    return sendSuccess(response, {
      message: "Login realizado com sucesso",
      data: result
    });
  });

  me = asyncHandler(async (request: Request, response: Response, _next) => {
    const authUser = getAuthUser(request);
    const usuario = await this.authService.me(authUser.id);

    return sendSuccess(response, {
      message: "Usuario autenticado consultado com sucesso",
      data: usuario
    });
  });
}
