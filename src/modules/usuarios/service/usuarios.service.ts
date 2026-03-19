import { UsuarioEntity } from "../domain/usuario.entity";
import { CreateUsuarioDTO } from "../dto/usuarios.dto";
import { IUsuariosRepository } from "../repository/usuarios.repository";

export class UsuariosService {
  // Service depende apenas da interface de repositorio.
  constructor(private readonly usuariosRepository: IUsuariosRepository) {}

  // Encaminha criacao para persistencia.
  async createUsuario(payload: CreateUsuarioDTO): Promise<UsuarioEntity> {
    return this.usuariosRepository.create(payload);
  }

  // Busca usuario por ID.
  async getUsuarioById(id: string): Promise<UsuarioEntity | null> {
    return this.usuariosRepository.findById(id);
  }

  // Consulta historico para composicao de perfil e endpoints de leitura.
  async getHistoricoEmprestimos(usuarioId: string): Promise<unknown[]> {
    return this.usuariosRepository.listHistoricoEmprestimos(usuarioId);
  }

  // Encaminha exclusao para camada de persistencia.
  async deleteUsuario(id: string): Promise<void> {
    return this.usuariosRepository.delete(id);
  }
}
