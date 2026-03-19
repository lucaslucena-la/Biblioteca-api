import { z } from "zod";

export type CreateUsuarioDTO = {
  nome: string;
  email: string;
};

export const createUsuarioSchema = z.object({
  nome: z.string().trim().min(1),
  email: z.string().trim().email()
});
