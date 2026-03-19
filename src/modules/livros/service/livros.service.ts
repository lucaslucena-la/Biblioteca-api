import { LivroEntity } from "../domain/livro.entity";
import { CreateLivroDTO, ListLivrosFiltersDTO, UpdateLivroDTO } from "../dto/livros.dto";
import { ILivrosRepository, FindAllLivrosFilters } from "../repository/livros.repository";
import { AppError } from "../../../shared/errors/app-error";

export class LivrosService {
  // Service depende do contrato de repositorio, nao da implementacao concreta.
  constructor(private readonly livrosRepository: ILivrosRepository) {}

  // Extrai codigo de erro de persistencia sem acoplar o service ao Prisma.
  private getPersistenceErrorCode(error: unknown): string | null {
    if (typeof error !== "object" || error === null) {
      return null;
    }

    const errorCode = (error as { code?: unknown }).code;

    return typeof errorCode === "string" ? errorCode : null;
  }

  // Mapeia violacoes de banco para erros de dominio do modulo de livros.
  private mapLivroPersistenceError(error: unknown): never {
    const errorCode = this.getPersistenceErrorCode(error);

    if (errorCode === "P2002") {
      throw new AppError({
        message: "ISBN ja existe",
        code: "ISBN_JA_EXISTE",
        statusCode: 409
      });
    }

    throw error;
  }

  // Encaminha criacao para a camada de persistencia.
  async createLivro(payload: CreateLivroDTO): Promise<LivroEntity> {
    try {
      return await this.livrosRepository.create(payload);
    } catch (error) {
      this.mapLivroPersistenceError(error);
    }
  }

  // Lista livros com leitura simples sem regras de negocio.
  async listLivros(filters?: ListLivrosFiltersDTO): Promise<LivroEntity[]> {
    const repositoryFilters: FindAllLivrosFilters | undefined = filters
      ? {
          titulo: filters.titulo,
          autor: filters.autor,
          categoria: filters.categoria,
          status: filters.status
        }
      : undefined;

    return this.livrosRepository.findAll(repositoryFilters);
  }

  // Busca livro por identificador.
  async getLivroById(id: string): Promise<LivroEntity> {
    const livro = await this.livrosRepository.findById(id);

    if (!livro) {
      throw new AppError({
        message: "Livro nao encontrado",
        code: "LIVRO_NAO_ENCONTRADO",
        statusCode: 404
      });
    }

    return livro;
  }

  // Atualiza campos de livro.
  async updateLivro(id: string, payload: UpdateLivroDTO): Promise<LivroEntity> {
    try {
      const livro = await this.livrosRepository.update(id, payload);

      if (!livro) {
        throw new AppError({
          message: "Livro nao encontrado",
          code: "LIVRO_NAO_ENCONTRADO",
          statusCode: 404
        });
      }

      return livro;
    } catch (error) {
      this.mapLivroPersistenceError(error);
    }
  }

  // Remove livro via operacao de repositorio (soft delete na infraestrutura).
  async deleteLivro(id: string): Promise<void> {
    const livro = await this.livrosRepository.findById(id);

    if (!livro) {
      throw new AppError({
        message: "Livro nao encontrado",
        code: "LIVRO_NAO_ENCONTRADO",
        statusCode: 404
      });
    }

    return this.livrosRepository.delete(id);
  }
}
