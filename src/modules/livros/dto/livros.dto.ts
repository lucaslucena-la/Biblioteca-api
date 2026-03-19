import { z } from "zod";

export type CreateLivroDTO = {
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
  categoria: string;
  status: string;
  estadoConservacao: string;
};

export type UpdateLivroDTO = Partial<CreateLivroDTO>;

export type ListLivrosFiltersDTO = Partial<{
  titulo: string;
  autor: string;
  categoria: string;
  status: string;
}>;

export const createLivroSchema = z.object({
  titulo: z.string().trim().min(1),
  autor: z.string().trim().min(1),
  isbn: z.string().trim().min(1),
  ano: z.number().int().min(0),
  categoria: z.string().trim().min(1),
  status: z.enum(["disponivel", "emprestado", "inativo"]),
  estadoConservacao: z.string().trim().min(1)
});

export const listLivrosFiltersSchema = z.object({
  titulo: z.string().trim().min(1).optional(),
  autor: z.string().trim().min(1).optional(),
  categoria: z.string().trim().min(1).optional(),
  status: z.enum(["disponivel", "emprestado", "inativo"]).optional()
});
