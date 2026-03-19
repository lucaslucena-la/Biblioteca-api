import { EmprestimoEntity } from "../domain/emprestimo.entity";
import { CreateEmprestimoDTO, RegistrarDevolucaoDTO } from "../dto/emprestimos.dto";
import { IEmprestimosRepository } from "../repository/emprestimos.repository";
import { AppError } from "../../../shared/errors/app-error";
import { IEmprestimosTransactionManager } from "./emprestimos-transaction-manager";

export class EmprestimosService {
  // Service depende apenas da interface de repositorio.
  constructor(
    private readonly emprestimosRepository: IEmprestimosRepository,
    private readonly transactionManager: IEmprestimosTransactionManager
  ) {}

  // Numero maximo de tentativas para erros transientes de transacao.
  private static readonly MAX_RETRY_ATTEMPTS = 3;

  // Delay base para backoff exponencial simples.
  private static readonly RETRY_BASE_DELAY_MS = 100;

  // Faz pausa assincrona entre tentativas de retry.
  private wait(delayMs: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, delayMs);
    });
  }

  // Extrai codigo de erro de persistencia sem acoplar service ao Prisma.
  private getPersistenceErrorCode(error: unknown): string | null {
    if (typeof error !== "object" || error === null) {
      return null;
    }

    const errorCode = (error as { code?: unknown }).code;

    return typeof errorCode === "string" ? errorCode : null;
  }

  // Identifica erro transiente de concorrencia para retry automatico.
  private isTransientTransactionError(error: unknown): boolean {
    if (error instanceof AppError) {
      return error.code === "CONCURRENCY_CONFLICT";
    }

    const errorCode = this.getPersistenceErrorCode(error);

    return errorCode === "P2034";
  }

  // Mapeia erros de persistencia para erros de dominio claros do modulo.
  private mapEmprestimoPersistenceError(error: unknown): never {
    const errorCode = this.getPersistenceErrorCode(error);

    if (errorCode === "P2002") {
      throw new AppError({
        message: "Livro ja emprestado",
        code: "LIVRO_JA_EMPRESTADO",
        statusCode: 409
      });
    }

    throw error;
  }

  // Executa operacao com retry para falhas transientes de transacao.
  private async runWithRetry<T>(operation: () => Promise<T>): Promise<T> {
    for (let attempt = 1; attempt <= EmprestimosService.MAX_RETRY_ATTEMPTS; attempt += 1) {
      try {
        return await operation();
      } catch (error) {
        const isLastAttempt = attempt === EmprestimosService.MAX_RETRY_ATTEMPTS;

        if (!this.isTransientTransactionError(error) || isLastAttempt) {
          throw error;
        }

        const delayMs = EmprestimosService.RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
        await this.wait(delayMs);
      }
    }

    throw new AppError({
      message: "Falha transiente ao processar transacao",
      code: "TRANSIENT_TRANSACTION_FAILURE",
      statusCode: 500
    });
  }

  // Cria emprestimo aplicando regras de dominio na camada de service.
  async criarEmprestimo(payload: CreateEmprestimoDTO): Promise<EmprestimoEntity> {
    try {
      return await this.runWithRetry(async () => {
        return this.transactionManager.runInTransaction(async (context) => {
          const now = new Date();
          const dueDate = new Date(now);
          dueDate.setDate(dueDate.getDate() + 14);

          const usuario = await context.usuariosRepository.findById(payload.usuarioId);

          if (!usuario) {
            throw new AppError({
              message: "Usuario nao encontrado",
              code: "USUARIO_NAO_ENCONTRADO",
              statusCode: 404
            });
          }

          const livro = await context.livrosRepository.findById(payload.livroId);

          if (!livro) {
            throw new AppError({
              message: "Livro nao encontrado",
              code: "LIVRO_NAO_ENCONTRADO",
              statusCode: 404
            });
          }

          if (livro.status !== "disponivel") {
            throw new AppError({
              message: "Livro indisponivel para emprestimo",
              code: "LIVRO_INDISPONIVEL",
              statusCode: 409
            });
          }

          // Verifica se o livro ja possui um emprestimo ativo.
          const activeLoanForBook = await context.emprestimosRepository.findActiveByBook(payload.livroId);

          // Se existir um emprestimo ativo para o livro, lança erro de conflito.
          if (activeLoanForBook) {
            throw new AppError({
              message: "Livro ja possui emprestimo ativo",
              code: "EMPRESTIMO_ATIVO_POR_LIVRO",
              statusCode: 409
            });
          }

          // Verifica se o usuario possui emprestimos ativos em atraso.
          const activeLoansByUser = await context.emprestimosRepository.findActiveByUser(payload.usuarioId);
          const hasOverdueLoan = activeLoansByUser.some((loan) => loan.dataPrevistaDevolucao < now);

          // Se o usuario possuir emprestimos ativos em atraso, lança erro de conflito.
          if (hasOverdueLoan) {
            throw new AppError({
              message: "Usuario possui emprestimo em atraso",
              code: "USUARIO_COM_ATRASO",
              statusCode: 409
            });
          }

          // Cria emprestimo e atualiza status do livro dentro da mesma transacao para garantir consistencia.
          const createdLoan = await context.emprestimosRepository.create(payload);
          const updatedLoan = await context.emprestimosRepository.update(createdLoan.id, {
            dataEmprestimo: now,
            dataPrevistaDevolucao: dueDate,
            status: "ativo"
          });

          // Se por algum motivo o emprestimo criado nao puder ser atualizado, lança erro de servidor.
          if (!updatedLoan) {
            throw new AppError({
              message: "Falha ao persistir emprestimo",
              code: "EMPRESTIMO_NAO_PERSISTIDO",
              statusCode: 500
            });
          }

          const updatedBook = await context.livrosRepository.update(payload.livroId, {
            status: "emprestado"
          });

          if (!updatedBook) {
            throw new AppError({
              message: "Falha ao atualizar status do livro",
              code: "LIVRO_STATUS_NAO_ATUALIZADO",
              statusCode: 500
            });
          }

          return updatedLoan;
        });
      });
    } catch (error) {
      this.mapEmprestimoPersistenceError(error);
    }
  }

  // Encaminha criacao de emprestimo para persistencia.
  async createEmprestimo(payload: CreateEmprestimoDTO): Promise<EmprestimoEntity> {
    return this.criarEmprestimo(payload);
  }

  // Lista emprestimos ativos via repositorio.
  async listEmprestimosAtivos(): Promise<EmprestimoEntity[]> {
    return this.emprestimosRepository.findAllActive();
  }

  // Atualiza emprestimo para registrar devolucao.
  async registrarDevolucao(id: string, payload: RegistrarDevolucaoDTO): Promise<EmprestimoEntity | null> {
    return this.runWithRetry(async () => {
      return this.transactionManager.runInTransaction(async (context) => {
        const emprestimo = await context.emprestimosRepository.findById(id);

        if (!emprestimo) {
          throw new AppError({
            message: "Emprestimo nao encontrado",
            code: "EMPRESTIMO_NAO_ENCONTRADO",
            statusCode: 404
          });
        }

        if (emprestimo.status !== "ativo") {
          throw new AppError({
            message: "Emprestimo nao esta ativo",
            code: "EMPRESTIMO_INATIVO",
            statusCode: 409
          });
        }

        const dataDevolucaoReal = payload.dataDevolucaoReal
          ? new Date(payload.dataDevolucaoReal)
          : new Date();

        const updatedLoan = await context.emprestimosRepository.update(id, {
          dataDevolucaoReal,
          status: "devolvido"
        });

        if (!updatedLoan) {
          throw new AppError({
            message: "Falha ao registrar devolucao",
            code: "DEVOLUCAO_NAO_REGISTRADA",
            statusCode: 500
          });
        }

        const updatedBook = await context.livrosRepository.update(emprestimo.livroId, {
          status: "disponivel"
        });

        if (!updatedBook) {
          throw new AppError({
            message: "Falha ao atualizar status do livro",
            code: "LIVRO_STATUS_NAO_ATUALIZADO",
            statusCode: 500
          });
        }

        return updatedLoan;
      });
    });
  }
}
