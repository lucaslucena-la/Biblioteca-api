import { UsuarioEntity } from "../domain/usuario.entity";
import { CreateUsuarioDTO } from "../dto/usuarios.dto";
import { EmprestimoEntity } from "../../emprestimos/domain/emprestimo.entity";

// Contrato da camada de persistencia para o modulo de usuarios.
export interface IUsuariosRepository {
  // Lista usuarios ativos.
  findAll(): Promise<UsuarioEntity[]>;

  // Busca usuario ativo por ID.
  findById(id: string): Promise<UsuarioEntity | null>;

  // Cria um novo registro de usuario.
  create(payload: CreateUsuarioDTO): Promise<UsuarioEntity>;

  // Realiza soft delete de usuario.
  delete(id: string): Promise<void>;

  // Busca usuario junto com informacao de emprestimo ativo (para regra futura).
  findWithActiveLoans(id: string): Promise<{ usuario: UsuarioEntity | null; hasActiveLoans: boolean }>;

  // Lista historico de emprestimos vinculado ao usuario.
  listHistoricoEmprestimos(usuarioId: string): Promise<EmprestimoEntity[]>;
}
