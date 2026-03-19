// Define os tipos de dados (DTOs) para as operações relacionadas a empréstimos, como criação de empréstimo e registro de devolução, garantindo uma estrutura clara e consistente para as requisições e respostas da API.
// DTOs (Data Transfer Objects) são usados para definir a forma dos dados que serão enviados e recebidos pela API, facilitando a validação e a documentação dos endpoints.

// Importa o tipo de entidade de empréstimo para referência nos DTOs
export type CreateEmprestimoDTO = {
  livroId: string;
  usuarioId: string;
};

// DTO para registrar a devolução de um empréstimo, contendo a data real de devolução
export type RegistrarDevolucaoDTO = {
  dataDevolucaoReal: string;
};
