import { Request, Response } from "express";
import { sendSuccess } from "../../../shared/http/api-response";
import { EmprestimosService } from "../service/emprestimos.service";

// O controller é responsável por receber as requisições HTTP, chamar o service para processar a lógica de negócio e retornar as respostas HTTP adequadas.
export class EmprestimosController {
  
  // Injeta o service via construtor (Dependency Injection)
  constructor(private readonly emprestimosService: EmprestimosService) {}

  /**
   * Cria um novo empréstimo
   * Recebe os dados no body da requisição
   * async porque chama o service que é assíncrono (operações de banco de dados)
   */
  create = async (request: Request, response: Response) => {
    // Chama o service para criar o empréstimo
    const emprestimo = await this.emprestimosService.createEmprestimo(request.body);

    // Retorna resposta padronizada de sucesso
    return sendSuccess(response, {
      message: "Emprestimo criado com sucesso",
      data: emprestimo,
      statusCode: 201 // HTTP Created
    });
  };

  /**
   * Lista todos os empréstimos ativos
   * async porque chama o service que é assíncrono (operações de banco de dados)
   */
  listAtivos = async (_request: Request, response: Response) => {
    // Busca empréstimos ativos no service
    const emprestimos = await this.emprestimosService.listEmprestimosAtivos();

    // Retorna resposta padronizada
    return sendSuccess(response, {
      message: "Emprestimos ativos listados com sucesso",
      data: emprestimos
    });
  };

  /**
   * Registra a devolução de um empréstimo
   * O ID vem pelos parâmetros da rota (request.params.id)
   * Dados adicionais podem vir no body
   * async porque chama o service que é assíncrono (operações de banco de dados)
   */
  registrarDevolucao = async (request: Request, response: Response) => {
    // Chama o service para registrar a devolução
    const emprestimo = await this.emprestimosService.registrarDevolucao(
      request.params.id,
      request.body
    );

    // Retorna resposta padronizada
    return sendSuccess(response, {
      message: "Devolucao registrada com sucesso",
      data: emprestimo
    });
  };
}