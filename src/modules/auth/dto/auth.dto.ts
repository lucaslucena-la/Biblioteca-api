import { z } from "zod";

export type RegisterDTO = {
  nome: string;
  email: string;
  senha: string;
};

export type LoginDTO = {
  email: string;
  senha: string;
};

export const registerSchema = z.object({
  nome: z.string().trim().min(1),
  email: z.string().trim().email(),
  senha: z.string().min(8)
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  senha: z.string().min(1)
});
