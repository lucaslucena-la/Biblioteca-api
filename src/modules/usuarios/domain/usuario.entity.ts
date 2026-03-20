export type UserRole = "USER" | "LIBRARIAN";

export type UsuarioEntity = {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type UsuarioAuthEntity = UsuarioEntity & {
  senha: string;
  ativo: boolean;
};
