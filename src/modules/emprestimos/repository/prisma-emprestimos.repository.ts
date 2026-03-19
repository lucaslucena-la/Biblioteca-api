import { PrismaClient } from "@prisma/client";

import { EmprestimoEntity } from "../domain/emprestimo.entity";
import { CreateEmprestimoDTO } from "../dto/emprestimos.dto";
import { IEmprestimosRepository, UpdateEmprestimoDTO } from "./emprestimos.repository";

// Implementacao concreta do repositorio de emprestimos usando Prisma.
export class PrismaEmprestimosRepository implements IEmprestimosRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  // Converte modelo Prisma para entidade de dominio de emprestimos.
  private toEntity(model: {
    id: string;
    livroId: string;
    usuarioId: string;
    dataEmprestimo: Date;
    dataPrevistaDevolucao: Date;
    dataDevolucaoReal: Date | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }): EmprestimoEntity {
    return {
      id: model.id,
      livroId: model.livroId,
      usuarioId: model.usuarioId,
      dataEmprestimo: model.dataEmprestimo,
      dataPrevistaDevolucao: model.dataPrevistaDevolucao,
      dataDevolucaoReal: model.dataDevolucaoReal,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt
    };
  }

  // Persiste novo emprestimo no banco de dados.
  async create(payload: CreateEmprestimoDTO): Promise<EmprestimoEntity> {
    const emprestimo = await this.prismaClient.emprestimo.create({
      data: {
        livroId: payload.livroId,
        usuarioId: payload.usuarioId
      }
    });

    return this.toEntity(emprestimo);
  }

  // Busca emprestimo por identificador.
  async findById(id: string): Promise<EmprestimoEntity | null> {
    const emprestimo = await this.prismaClient.emprestimo.findUnique({
      where: {
        id
      }
    });

    if (!emprestimo) {
      return null;
    }

    return this.toEntity(emprestimo);
  }

  // Lista emprestimos ativos de um usuario.
  async findActiveByUser(usuarioId: string): Promise<EmprestimoEntity[]> {
    const emprestimos = await this.prismaClient.emprestimo.findMany({
      where: {
        usuarioId,
        status: "ativo"
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return emprestimos.map((emprestimo) => this.toEntity(emprestimo));
  }

  // Busca emprestimo ativo relacionado a um livro.
  async findActiveByBook(livroId: string): Promise<EmprestimoEntity | null> {
    const emprestimo = await this.prismaClient.emprestimo.findFirst({
      where: {
        livroId,
        status: "ativo"
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (!emprestimo) {
      return null;
    }

    return this.toEntity(emprestimo);
  }

  // Atualiza campos do emprestimo por ID.
  async update(id: string, payload: UpdateEmprestimoDTO): Promise<EmprestimoEntity | null> {
    const result = await this.prismaClient.emprestimo.updateMany({
      where: {
        id
      },
      data: {
        dataEmprestimo: payload.dataEmprestimo,
        dataPrevistaDevolucao: payload.dataPrevistaDevolucao,
        dataDevolucaoReal: payload.dataDevolucaoReal,
        status: payload.status
      }
    });

    if (result.count === 0) {
      return null;
    }

    return this.findById(id);
  }

  // Lista todos os emprestimos ativos.
  async findAllActive(): Promise<EmprestimoEntity[]> {
    const emprestimos = await this.prismaClient.emprestimo.findMany({
      where: {
        status: "ativo"
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return emprestimos.map((emprestimo) => this.toEntity(emprestimo));
  }
}
