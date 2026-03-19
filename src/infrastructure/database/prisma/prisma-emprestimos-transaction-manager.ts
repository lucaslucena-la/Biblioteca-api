import { Prisma, PrismaClient } from "@prisma/client";

import { AppError } from "../../../shared/errors/app-error";
import {
  EmprestimosTransactionContext,
  IEmprestimosTransactionManager
} from "../../../modules/emprestimos/service/emprestimos-transaction-manager";
import { PrismaEmprestimosRepository } from "../../../modules/emprestimos/repository/prisma-emprestimos.repository";
import { PrismaLivrosRepository } from "../../../modules/livros/repository/prisma-livros.repository";
import { PrismaUsuariosRepository } from "../../../modules/usuarios/repository/prisma-usuarios.repository";

// Gerenciador de transacao que cria repositories escopados ao mesmo transaction client.
export class PrismaEmprestimosTransactionManager implements IEmprestimosTransactionManager {
  constructor(private readonly prismaClient: PrismaClient) {}

  // Executa operacao do modulo de emprestimos dentro de transacao serializavel.
  async runInTransaction<T>(operation: (context: EmprestimosTransactionContext) => Promise<T>): Promise<T> {
    try {
      return await this.prismaClient.$transaction(
        async (transactionClient) => {
          const prismaTxClient = transactionClient as unknown as PrismaClient;

          return operation({
            emprestimosRepository: new PrismaEmprestimosRepository(prismaTxClient),
            livrosRepository: new PrismaLivrosRepository(prismaTxClient),
            usuariosRepository: new PrismaUsuariosRepository(prismaTxClient)
          });
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable
        }
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034"
      ) {
        throw new AppError({
          message: "Conflito de concorrencia ao processar emprestimo",
          code: "CONCURRENCY_CONFLICT",
          statusCode: 409
        });
      }

      throw error;
    }
  }
}
