import { IEmprestimosRepository } from "../repository/emprestimos.repository";
import { ILivrosRepository } from "../../livros/repository/livros.repository";
import { IUsuariosRepository } from "../../usuarios/repository/usuarios.repository";

// Contexto exposto para a execucao transacional do modulo de emprestimos.
export type EmprestimosTransactionContext = {
  emprestimosRepository: IEmprestimosRepository;
  livrosRepository: ILivrosRepository;
  usuariosRepository: IUsuariosRepository;
};

// Contrato de transacao para desacoplar service da tecnologia de banco.
export interface IEmprestimosTransactionManager {
  runInTransaction<T>(operation: (context: EmprestimosTransactionContext) => Promise<T>): Promise<T>;
}
