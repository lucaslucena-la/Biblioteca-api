import { Request, Response } from "express";

import { sendSuccess } from "../../../shared/http/api-response";
import { UsuariosService } from "../service/usuarios.service";

export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  create = async (request: Request, response: Response) => {
    const usuario = await this.usuariosService.createUsuario(request.body);

    return sendSuccess(response, {
      message: "Usuario criado com sucesso",
      data: usuario,
      statusCode: 201
    });
  };

  getById = async (request: Request, response: Response) => {
    const usuario = await this.usuariosService.getUsuarioById(request.params.id);

    return sendSuccess(response, {
      message: "Perfil consultado com sucesso",
      data: usuario
    });
  };

  getHistoricoEmprestimos = async (request: Request, response: Response) => {
    const historico = await this.usuariosService.getHistoricoEmprestimos(request.params.id);

    return sendSuccess(response, {
      message: "Historico consultado com sucesso",
      data: historico
    });
  };

  delete = async (request: Request, response: Response) => {
    await this.usuariosService.deleteUsuario(request.params.id);

    return sendSuccess(response, {
      message: "Usuario removido com sucesso",
      data: null
    });
  };
}
