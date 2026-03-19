import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Biblioteca API",
    version: "1.0.0",
    description: "API de gestão de biblioteca comunitária"
  },
  servers: [
    {
      url: "http://localhost:3000/api"
    }
  ],
  components: {
    schemas: {
      ApiSuccess: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "Operação concluída" },
          data: { type: "object", nullable: true },
          meta: { type: "object", nullable: true }
        }
      },
      ApiError: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string", example: "Falha na operação" },
          error: {
            type: "object",
            properties: {
              code: { type: "string", example: "APP_ERROR" },
              details: { type: "object", nullable: true }
            }
          }
        }
      },
      LivroInput: {
        type: "object",
        required: ["titulo", "autor", "isbn", "ano", "categoria", "status", "estadoConservacao"],
        properties: {
          titulo: { type: "string", example: "Clean Code" },
          autor: { type: "string", example: "Robert C. Martin" },
          isbn: { type: "string", example: "978-0132350884" },
          ano: { type: "integer", example: 2008 },
          categoria: { type: "string", example: "Engenharia de Software" },
          status: { type: "string", enum: ["disponivel", "emprestado", "inativo"], example: "disponivel" },
          estadoConservacao: { type: "string", example: "bom" }
        }
      },
      UsuarioInput: {
        type: "object",
        required: ["nome", "email"],
        properties: {
          nome: { type: "string", example: "Ana Silva" },
          email: { type: "string", example: "ana@biblioteca.local" }
        }
      },
      EmprestimoInput: {
        type: "object",
        required: ["livroId", "usuarioId"],
        properties: {
          livroId: { type: "string", format: "uuid" },
          usuarioId: { type: "string", format: "uuid" }
        }
      },
      DevolucaoInput: {
        type: "object",
        properties: {
          dataDevolucaoReal: { type: "string", format: "date-time" }
        }
      }
    }
  },
  paths: {
    "/livros": {
      get: {
        summary: "Listar livros",
        description: "Retorna a lista de livros cadastrados, com filtros opcionais.",
        parameters: [
          { in: "query", name: "titulo", schema: { type: "string" }, required: false },
          { in: "query", name: "autor", schema: { type: "string" }, required: false },
          { in: "query", name: "categoria", schema: { type: "string" }, required: false },
          { in: "query", name: "status", schema: { type: "string" }, required: false }
        ],
        responses: {
          "200": { description: "Sucesso" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Não encontrado" },
          "409": { description: "Conflito" }
        }
      },
      post: {
        summary: "Criar livro",
        description: "Cria um novo livro no catálogo.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LivroInput" }
            }
          }
        },
        responses: {
          "201": { description: "Criado com sucesso" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Não encontrado" },
          "409": { description: "Conflito" }
        }
      }
    },
    "/livros/{id}": {
      get: {
        summary: "Consultar livro por ID",
        description: "Retorna os detalhes de um livro específico.",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          "200": { description: "Sucesso" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Livro não encontrado" },
          "409": { description: "Conflito" }
        }
      },
      put: {
        summary: "Atualizar livro",
        description: "Atualiza os dados de um livro existente.",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LivroInput" }
            }
          }
        },
        responses: {
          "200": { description: "Atualizado com sucesso" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Livro não encontrado" },
          "409": { description: "Conflito" }
        }
      },
      delete: {
        summary: "Remover livro",
        description: "Realiza remoção lógica de um livro.",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          "200": { description: "Removido com sucesso" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Livro não encontrado" },
          "409": { description: "Conflito" }
        }
      }
    },
    "/usuarios": {
      get: {
        summary: "Listar usuários",
        description: "Retorna a lista de usuários ativos cadastrados.",
        responses: {
          "200": { description: "Sucesso" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Não encontrado" },
          "409": { description: "Conflito" }
        }
      },
      post: {
        summary: "Criar usuário",
        description: "Cria um novo usuário na biblioteca.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsuarioInput" }
            }
          }
        },
        responses: {
          "201": { description: "Criado com sucesso" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Não encontrado" },
          "409": { description: "Conflito" }
        }
      }
    },
    "/usuarios/{id}": {
      get: {
        summary: "Consultar perfil do usuário",
        description: "Retorna os dados de perfil de um usuário.",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          "200": { description: "Sucesso" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Usuário não encontrado" },
          "409": { description: "Conflito" }
        }
      },
      delete: {
        summary: "Remover usuário",
        description: "Realiza remoção lógica de um usuário.",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          "200": { description: "Removido com sucesso" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Usuário não encontrado" },
          "409": { description: "Conflito" }
        }
      }
    },
    "/usuarios/{id}/historico-emprestimos": {
      get: {
        summary: "Listar histórico de empréstimos do usuário",
        description: "Retorna o histórico de empréstimos de um usuário.",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          "200": { description: "Sucesso" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Usuário não encontrado" },
          "409": { description: "Conflito" }
        }
      }
    },
    "/emprestimos": {
      post: {
        summary: "Criar empréstimo",
        description: "Cria um novo empréstimo com base no livro e usuário informados.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EmprestimoInput" }
            }
          }
        },
        responses: {
          "201": { description: "Criado com sucesso" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Não encontrado" },
          "409": { description: "Conflito" }
        }
      }
    },
    "/emprestimos/ativos": {
      get: {
        summary: "Listar empréstimos ativos",
        description: "Retorna a lista de empréstimos com status ativo.",
        responses: {
          "200": { description: "Sucesso" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Não encontrado" },
          "409": { description: "Conflito" }
        }
      }
    },
    "/emprestimos/{id}/devolucao": {
      post: {
        summary: "Registrar devolução",
        description: "Registra a devolução de um empréstimo ativo.",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DevolucaoInput" }
            }
          }
        },
        responses: {
          "200": { description: "Sucesso" },
          "201": { description: "Criado" },
          "400": { description: "Requisição inválida" },
          "404": { description: "Empréstimo não encontrado" },
          "409": { description: "Conflito" }
        }
      }
    }
  }
};

const options: swaggerJSDoc.Options = {
  definition: swaggerDefinition,
  apis: []
};

export const swaggerSpec = swaggerJSDoc(options);
