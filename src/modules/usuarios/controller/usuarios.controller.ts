import { Request, Response } from "express";

import { sendSuccess } from "../../../shared/http/api-response";
import { asyncHandler } from "../../../shared/middleware/async-handler";
import { validateWithSchema } from "../../../shared/validation/validate-with-zod";
import { createUsuarioSchema } from "../dto/usuarios.dto";
import { UsuariosService } from "../service/usuarios.service";

export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  list = asyncHandler(async (_request: Request, response: Response, _next) => {
    const usuarios = await this.usuariosService.listUsuarios();

    return sendSuccess(response, {
      message: "Usuarios listados com sucesso",
      data: usuarios
    });
  });

  create = asyncHandler(async (request: Request, response: Response, _next) => {
    const payload = validateWithSchema(createUsuarioSchema, request.body);
    const usuario = await this.usuariosService.createUsuario(payload);

    return sendSuccess(response, {
      message: "Usuario criado com sucesso",
      data: usuario,
      statusCode: 201
    });
  });

  getById = asyncHandler(async (request: Request, response: Response, _next) => {
    const usuario = await this.usuariosService.getUsuarioById(request.params.id);

    return sendSuccess(response, {
      message: "Perfil consultado com sucesso",
      data: usuario
    });
  });

  getHistoricoEmprestimos = asyncHandler(async (request: Request, response: Response, _next) => {
    const historico = await this.usuariosService.getHistoricoEmprestimos(request.params.id);

    return sendSuccess(response, {
      message: "Historico consultado com sucesso",
      data: historico
    });
  });

  delete = asyncHandler(async (request: Request, response: Response, _next) => {
    await this.usuariosService.deleteUsuario(request.params.id);

    return sendSuccess(response, {
      message: "Usuario removido com sucesso",
      data: null
    });
  });
}
