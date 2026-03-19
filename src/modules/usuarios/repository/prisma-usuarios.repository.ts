import { PrismaClient } from "@prisma/client";

import { UsuarioEntity } from "../domain/usuario.entity";
import { CreateUsuarioDTO } from "../dto/usuarios.dto";
import { EmprestimoEntity } from "../../emprestimos/domain/emprestimo.entity";
import { IUsuariosRepository } from "./usuarios.repository";

// Implementacao concreta do repositorio de usuarios usando Prisma.
export class PrismaUsuariosRepository implements IUsuariosRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  // Converte modelo Prisma para entidade do dominio de usuarios.
  private toEntity(model: {
    id: string;
    nome: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }): UsuarioEntity {
    return {
      id: model.id,
      nome: model.nome,
      email: model.email,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt
    };
  }

  private toEmprestimoEntity(model: {
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

  // Lista usuarios ativos ordenados por data de criacao decrescente.
  async findAll(): Promise<UsuarioEntity[]> {
    const usuarios = await this.prismaClient.usuario.findMany({
      where: {
        ativo: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return usuarios.map((usuario) => this.toEntity(usuario));
  }

  // Busca usuario ativo por identificador.
  async findById(id: string): Promise<UsuarioEntity | null> {
    const usuario = await this.prismaClient.usuario.findFirst({
      where: {
        id,
        ativo: true
      }
    });

    if (!usuario) {
      return null;
    }

    return this.toEntity(usuario);
  }

  // Persiste novo usuario no banco de dados.
  async create(payload: CreateUsuarioDTO): Promise<UsuarioEntity> {
    const usuario = await this.prismaClient.usuario.create({
      data: {
        nome: payload.nome,
        email: payload.email
      }
    });

    return this.toEntity(usuario);
  }

  // Executa soft delete marcando usuario como inativo.
  async delete(id: string): Promise<void> {
    await this.prismaClient.usuario.updateMany({
      where: {
        id,
        ativo: true
      },
      data: {
        ativo: false
      }
    });
  }

  // Retorna usuario e indicador de emprestimo ativo para uso futuro na camada de servico.
  async findWithActiveLoans(id: string): Promise<{ usuario: UsuarioEntity | null; hasActiveLoans: boolean }> {
    const result = await this.prismaClient.usuario.findFirst({
      where: {
        id,
        ativo: true
      },
      include: {
        emprestimos: {
          where: {
            status: "ativo"
          },
          select: {
            id: true
          }
        }
      }
    });

    if (!result) {
      return { usuario: null, hasActiveLoans: false };
    }

    return {
      usuario: this.toEntity(result),
      hasActiveLoans: result.emprestimos.length > 0
    };
  }

  // Busca historico simples de emprestimos do usuario.
  async listHistoricoEmprestimos(usuarioId: string): Promise<EmprestimoEntity[]> {
    const emprestimos = await this.prismaClient.emprestimo.findMany({
      where: {
        usuarioId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return emprestimos.map((emprestimo) => this.toEmprestimoEntity(emprestimo));
  }
}
