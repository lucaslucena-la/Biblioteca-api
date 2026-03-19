import { EmprestimoEntity } from "../domain/emprestimo.entity";
import { CreateEmprestimoDTO } from "../dto/emprestimos.dto";

// Payload de atualizacao de emprestimo para operacoes de persistencia.
export type UpdateEmprestimoDTO = Partial<{
  dataEmprestimo: Date;
  dataPrevistaDevolucao: Date;
  dataDevolucaoReal: Date | null;
  status: string;
}>;

// Contrato da camada de persistencia para o modulo de emprestimos.
export interface IEmprestimosRepository {
  // Cria um novo registro de emprestimo.
  create(payload: CreateEmprestimoDTO): Promise<EmprestimoEntity>;

  // Busca um emprestimo por ID.
  findById(id: string): Promise<EmprestimoEntity | null>;

  // Busca emprestimos ativos de um usuario.
  findActiveByUser(usuarioId: string): Promise<EmprestimoEntity[]>;

  // Busca emprestimo ativo de um livro.
  findActiveByBook(livroId: string): Promise<EmprestimoEntity | null>;

  // Atualiza campos persistidos do emprestimo.
  update(id: string, payload: UpdateEmprestimoDTO): Promise<EmprestimoEntity | null>;

  // Lista emprestimos ativos (apoio para endpoint atual).
  findAllActive(): Promise<EmprestimoEntity[]>;
}
