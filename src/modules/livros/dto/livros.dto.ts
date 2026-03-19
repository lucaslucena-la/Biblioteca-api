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
