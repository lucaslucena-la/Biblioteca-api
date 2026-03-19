import { PrismaClient } from "@prisma/client";

import { LivroEntity } from "../domain/livro.entity";
import { CreateLivroDTO, UpdateLivroDTO } from "../dto/livros.dto";
import { FindAllLivrosFilters, ILivrosRepository } from "./livros.repository";

// Normaliza ISBN removendo caracteres especiais e aplicando uppercase.
function normalizeIsbn(isbn: string): string {
  return isbn.replace(/[^0-9a-z]/gi, "").toUpperCase();
}

// Implementacao concreta do repositorio de livros usando Prisma.
export class PrismaLivrosRepository implements ILivrosRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  // Converte modelo Prisma em entidade de dominio do modulo.
  private toEntity(model: {
    id: string;
    titulo: string;
    autor: string;
    isbn: string;
    ano: number;
    categoria: string;
    status: string;
    estadoConservacao: string;
    createdAt: Date;
    updatedAt: Date;
  }): LivroEntity {
    return {
      id: model.id,
      titulo: model.titulo,
      autor: model.autor,
      isbn: model.isbn,
      ano: model.ano,
      categoria: model.categoria,
      status: model.status,
      estadoConservacao: model.estadoConservacao,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt
    };
  }

  // Busca livro ativo por identificador.
  async findById(id: string): Promise<LivroEntity | null> {
    const livro = await this.prismaClient.livro.findFirst({
      where: {
        id,
        ativo: true
      }
    });

    if (!livro) {
      return null;
    }

    return this.toEntity(livro);
  }

  // Lista livros ativos com filtros textuais opcionais.
  async findAll(filters?: FindAllLivrosFilters): Promise<LivroEntity[]> {
    const livros = await this.prismaClient.livro.findMany({
      where: {
        ativo: true,
        titulo: filters?.titulo ? { contains: filters.titulo, mode: "insensitive" } : undefined,
        autor: filters?.autor ? { contains: filters.autor, mode: "insensitive" } : undefined,
        categoria: filters?.categoria ? { equals: filters.categoria, mode: "insensitive" } : undefined,
        status: filters?.status ? { equals: filters.status, mode: "insensitive" } : undefined
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return livros.map((livro) => this.toEntity(livro));
  }

  // Persiste novo livro no banco de dados.
  async create(payload: CreateLivroDTO): Promise<LivroEntity> {
    const isbnNormalizado = normalizeIsbn(payload.isbn);

    const livro = await this.prismaClient.livro.create({
      data: {
        titulo: payload.titulo,
        autor: payload.autor,
        isbn: payload.isbn,
        isbnNormalizado,
        ano: payload.ano,
        categoria: payload.categoria,
        status: payload.status,
        estadoConservacao: payload.estadoConservacao
      }
    });

    return this.toEntity(livro);
  }

  // Atualiza livro por ID sem aplicar regra de negocio.
  async update(id: string, payload: UpdateLivroDTO): Promise<LivroEntity | null> {
    const isbnNormalizado = payload.isbn ? normalizeIsbn(payload.isbn) : undefined;

    const livro = await this.prismaClient.livro.updateMany({
      where: {
        id,
        ativo: true
      },
      data: {
        titulo: payload.titulo,
        autor: payload.autor,
        isbn: payload.isbn,
        isbnNormalizado,
        ano: payload.ano,
        categoria: payload.categoria,
        status: payload.status,
        estadoConservacao: payload.estadoConservacao
      }
    });

    if (livro.count === 0) {
      return null;
    }

    return this.findById(id);
  }

  // Executa soft delete marcando registro como inativo.
  async delete(id: string): Promise<void> {
    await this.prismaClient.livro.updateMany({
      where: {
        id,
        ativo: true
      },
      data: {
        ativo: false
      }
    });
  }
}
