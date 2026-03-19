import { Request, Response } from "express";

import { sendSuccess } from "../../../shared/http/api-response";
import { asyncHandler } from "../../../shared/middleware/async-handler";
import { validateWithSchema } from "../../../shared/validation/validate-with-zod";
import { createLivroSchema, listLivrosFiltersSchema } from "../dto/livros.dto";
import { LivrosService } from "../service/livros.service";

export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  create = asyncHandler(async (request: Request, response: Response, _next) => {
    const payload = validateWithSchema(createLivroSchema, request.body);
    const livro = await this.livrosService.createLivro(payload);

    return sendSuccess(response, {
      message: "Livro criado com sucesso",
      data: livro,
      statusCode: 201
    });
  });

  list = asyncHandler(async (request: Request, response: Response, _next) => {
    const filters = validateWithSchema(listLivrosFiltersSchema, {
      titulo: request.query.titulo,
      autor: request.query.autor,
      categoria: request.query.categoria,
      status: request.query.status
    });

    const livros = await this.livrosService.listLivros(filters);

    return sendSuccess(response, {
      message: "Livros listados com sucesso",
      data: livros
    });
  });

  getById = asyncHandler(async (request: Request, response: Response, _next) => {
    const livro = await this.livrosService.getLivroById(request.params.id);

    return sendSuccess(response, {
      message: "Livro consultado com sucesso",
      data: livro
    });
  });

  update = asyncHandler(async (request: Request, response: Response, _next) => {
    const livro = await this.livrosService.updateLivro(request.params.id, request.body);

    return sendSuccess(response, {
      message: "Livro atualizado com sucesso",
      data: livro
    });
  });

  delete = asyncHandler(async (request: Request, response: Response, _next) => {
    await this.livrosService.deleteLivro(request.params.id);

    return sendSuccess(response, {
      message: "Livro removido com sucesso",
      data: null
    });
  });
}
