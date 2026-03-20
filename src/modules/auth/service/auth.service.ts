import { AppError } from "../../../shared/errors/app-error";
import { signAuthToken } from "../../../shared/auth/jwt";
import { comparePassword, hashPassword } from "../../../shared/auth/password";
import { UsuarioEntity } from "../../usuarios/domain/usuario.entity";
import { IUsuariosRepository } from "../../usuarios/repository/usuarios.repository";
import { LoginDTO, RegisterDTO } from "../dto/auth.dto";

type AuthResult = {
  token: string;
  usuario: UsuarioEntity;
};

export class AuthService {
  constructor(private readonly usuariosRepository: IUsuariosRepository) {}

  async register(payload: RegisterDTO): Promise<AuthResult> {
    const existing = await this.usuariosRepository.findByEmail(payload.email);

    if (existing) {
      throw new AppError({
        message: "Email ja cadastrado",
        code: "EMAIL_JA_CADASTRADO",
        statusCode: 409
      });
    }

    const senha = await hashPassword(payload.senha);
    const usuario = await this.usuariosRepository.create({
      nome: payload.nome,
      email: payload.email,
      senha,
      role: "USER"
    });

    const token = signAuthToken({
      id: usuario.id,
      role: usuario.role
    });

    return { token, usuario };
  }

  async login(payload: LoginDTO): Promise<AuthResult> {
    const usuario = await this.usuariosRepository.findByEmail(payload.email);

    if (!usuario) {
      throw new AppError({
        message: "Credenciais invalidas",
        code: "INVALID_CREDENTIALS",
        statusCode: 401
      });
    }

    const passwordMatches = await comparePassword(payload.senha, usuario.senha);

    if (!passwordMatches) {
      throw new AppError({
        message: "Credenciais invalidas",
        code: "INVALID_CREDENTIALS",
        statusCode: 401
      });
    }

    const usuarioPublico: UsuarioEntity = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt
    };

    const token = signAuthToken({
      id: usuario.id,
      role: usuario.role
    });

    return { token, usuario: usuarioPublico };
  }

  async me(userId: string): Promise<UsuarioEntity> {
    const usuario = await this.usuariosRepository.findById(userId);

    if (!usuario) {
      throw new AppError({
        message: "Usuario nao encontrado",
        code: "USUARIO_NAO_ENCONTRADO",
        statusCode: 404
      });
    }

    return usuario;
  }
}
