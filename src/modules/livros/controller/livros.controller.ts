import { Request, Response } from "express";

import { sendSuccess } from "../../../shared/http/api-response";
import { LivrosService } from "../service/livros.service";

export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  create = async (request: Request, response: Response) => {
    const livro = await this.livrosService.createLivro(request.body);

    return sendSuccess(response, {
      message: "Livro criado com sucesso",
      data: livro,
      statusCode: 201
    });
  };

  list = async (_request: Request, response: Response) => {
    const livros = await this.livrosService.listLivros();

    return sendSuccess(response, {
      message: "Livros listados com sucesso",
      data: livros
    });
  };

  getById = async (request: Request, response: Response) => {
    const livro = await this.livrosService.getLivroById(request.params.id);

    return sendSuccess(response, {
      message: "Livro consultado com sucesso",
      data: livro
    });
  };

  update = async (request: Request, response: Response) => {
    const livro = await this.livrosService.updateLivro(request.params.id, request.body);

    return sendSuccess(response, {
      message: "Livro atualizado com sucesso",
      data: livro
    });
  };

  delete = async (request: Request, response: Response) => {
    await this.livrosService.deleteLivro(request.params.id);

    return sendSuccess(response, {
      message: "Livro removido com sucesso",
      data: null
    });
  };
}
