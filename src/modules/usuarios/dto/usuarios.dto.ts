import { z } from "zod";

import { UserRole } from "../domain/usuario.entity";

export type CreateUsuarioDTO = {
  nome: string;
  email: string;
  senha: string;
  role?: UserRole;
};

export const createUsuarioSchema = z.object({
  nome: z.string().trim().min(1),
  email: z.string().trim().email(),
  senha: z.string().min(8)
});
