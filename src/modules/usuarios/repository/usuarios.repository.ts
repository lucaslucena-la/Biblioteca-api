import { UsuarioAuthEntity, UsuarioEntity, UserRole } from "../domain/usuario.entity";
import { EmprestimoEntity } from "../../emprestimos/domain/emprestimo.entity";

export type CreateUsuarioRepositoryDTO = {
  nome: string;
  email: string;
  senha: string;
  role: UserRole;
};

// Contrato da camada de persistencia para o modulo de usuarios.
export interface IUsuariosRepository {
  // Lista usuarios ativos.
  findAll(): Promise<UsuarioEntity[]>;

  // Busca usuario ativo por ID.
  findById(id: string): Promise<UsuarioEntity | null>;

  // Cria um novo registro de usuario.
  create(payload: CreateUsuarioRepositoryDTO): Promise<UsuarioEntity>;

  // Realiza soft delete de usuario.
  delete(id: string): Promise<void>;

  // Busca usuario junto com informacao de emprestimo ativo (para regra futura).
  findWithActiveLoans(id: string): Promise<{ usuario: UsuarioEntity | null; hasActiveLoans: boolean }>;

  // Lista historico de emprestimos vinculado ao usuario.
  listHistoricoEmprestimos(usuarioId: string): Promise<EmprestimoEntity[]>;

  // Busca usuario ativo por email para autenticacao.
  findByEmail(email: string): Promise<UsuarioAuthEntity | null>;
}
