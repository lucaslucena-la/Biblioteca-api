import { UsuarioEntity } from "../domain/usuario.entity";
import { CreateUsuarioDTO } from "../dto/usuarios.dto";
import { EmprestimoEntity } from "../../emprestimos/domain/emprestimo.entity";
import { IUsuariosRepository } from "../repository/usuarios.repository";
import { AppError } from "../../../shared/errors/app-error";

export class UsuariosService {
  // Service depende apenas da interface de repositorio.
  constructor(private readonly usuariosRepository: IUsuariosRepository) {}

  // Lista usuarios ativos.
  async listUsuarios(): Promise<UsuarioEntity[]> {
    return this.usuariosRepository.findAll();
  }

  // Encaminha criacao para persistencia.
  async createUsuario(payload: CreateUsuarioDTO): Promise<UsuarioEntity> {
    return this.usuariosRepository.create(payload);
  }

  // Busca usuario por ID.
  async getUsuarioById(id: string): Promise<UsuarioEntity> {
    const usuario = await this.usuariosRepository.findById(id);

    if (!usuario) {
      throw new AppError({
        message: "Usuario nao encontrado",
        code: "USUARIO_NAO_ENCONTRADO",
        statusCode: 404
      });
    }

    return usuario;
  }

  // Consulta historico para composicao de perfil e endpoints de leitura.
  async getHistoricoEmprestimos(usuarioId: string): Promise<EmprestimoEntity[]> {
    const usuario = await this.usuariosRepository.findById(usuarioId);

    if (!usuario) {
      throw new AppError({
        message: "Usuario nao encontrado",
        code: "USUARIO_NAO_ENCONTRADO",
        statusCode: 404
      });
    }

    return this.usuariosRepository.listHistoricoEmprestimos(usuarioId);
  }

  // Encaminha exclusao para camada de persistencia.
  async deleteUsuario(id: string): Promise<void> {
    const usuario = await this.usuariosRepository.findById(id);

    if (!usuario) {
      throw new AppError({
        message: "Usuario nao encontrado",
        code: "USUARIO_NAO_ENCONTRADO",
        statusCode: 404
      });
    }

    return this.usuariosRepository.delete(id);
  }
}
