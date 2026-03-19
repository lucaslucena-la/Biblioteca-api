import { LivroEntity } from "../domain/livro.entity";
import { CreateLivroDTO, UpdateLivroDTO } from "../dto/livros.dto";
import { ILivrosRepository } from "../repository/livros.repository";
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
  async listLivros(): Promise<LivroEntity[]> {
    return this.livrosRepository.findAll();
  }

  // Busca livro por identificador.
  async getLivroById(id: string): Promise<LivroEntity | null> {
    return this.livrosRepository.findById(id);
  }

  // Atualiza campos de livro.
  async updateLivro(id: string, payload: UpdateLivroDTO): Promise<LivroEntity | null> {
    try {
      return await this.livrosRepository.update(id, payload);
    } catch (error) {
      this.mapLivroPersistenceError(error);
    }
  }

  // Remove livro via operacao de repositorio (soft delete na infraestrutura).
  async deleteLivro(id: string): Promise<void> {
    return this.livrosRepository.delete(id);
  }
}
