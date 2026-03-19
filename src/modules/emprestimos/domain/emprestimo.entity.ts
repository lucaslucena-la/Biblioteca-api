// Define o tipo de entidade para empréstimos, representando a estrutura dos dados que serão manipulados no sistema de gestão de biblioteca comunitária.

export type EmprestimoEntity = {
  id: string;
  livroId: string;
  usuarioId: string;
  dataEmprestimo: Date;
  dataPrevistaDevolucao: Date;
  dataDevolucaoReal: Date | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
