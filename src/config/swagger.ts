import swaggerJSDoc from "swagger-jsdoc";

const baseUrl = process.env.API_URL || "http://localhost:3000";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Biblioteca API",
    description:
      "API para gestao de biblioteca comunitaria com autenticacao e controle de acesso<br><br><strong>[ Base URL: / ]</strong><br><a href=\"/swagger.json\">/swagger.json</a>",
    version: "1.0.0"
  },
  servers: [
    {
      url: `${baseUrl}/api`
    }
  ],
  tags: [
    { name: "Auth", description: "Autenticacao e autorizacao" },
    { name: "Usuarios", description: "Gestao de usuarios" },
    { name: "Livros", description: "Gestao de livros" },
    { name: "Emprestimos", description: "Controle de emprestimos" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      Usuario: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid", example: "7a48e4c9-5abc-431e-bf45-8f8d3f9ae4b6" },
          nome: { type: "string", example: "Joao Silva" },
          email: { type: "string", format: "email", example: "joao@email.com" },
          role: { type: "string", enum: ["USER", "LIBRARIAN"], example: "USER" },
          createdAt: { type: "string", format: "date-time", example: "2026-03-19T10:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2026-03-19T10:00:00.000Z" }
        }
      },
      Livro: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid", example: "2f1eb74e-35e2-4d45-9127-e87f2ef5545d" },
          titulo: { type: "string", example: "Clean Code" },
          autor: { type: "string", example: "Robert C. Martin" },
          isbn: { type: "string", example: "978-0132350884" },
          ano: { type: "integer", example: 2008 },
          categoria: { type: "string", example: "Engenharia de Software" },
          status: { type: "string", enum: ["disponivel", "emprestado", "inativo"], example: "disponivel" },
          estadoConservacao: { type: "string", example: "bom" },
          createdAt: { type: "string", format: "date-time", example: "2026-03-19T10:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2026-03-19T10:00:00.000Z" }
        }
      },
      Emprestimo: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid", example: "f7f76f07-4e9f-4587-9de9-495684c43e86" },
          livroId: { type: "string", format: "uuid", example: "2f1eb74e-35e2-4d45-9127-e87f2ef5545d" },
          usuarioId: { type: "string", format: "uuid", example: "7a48e4c9-5abc-431e-bf45-8f8d3f9ae4b6" },
          dataEmprestimo: { type: "string", format: "date-time", example: "2026-03-19T10:00:00.000Z" },
          dataPrevistaDevolucao: { type: "string", format: "date-time", example: "2026-03-26T10:00:00.000Z" },
          dataDevolucaoReal: { type: "string", format: "date-time", nullable: true, example: null },
          status: { type: "string", example: "ativo" },
          createdAt: { type: "string", format: "date-time", example: "2026-03-19T10:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2026-03-19T10:00:00.000Z" }
        }
      },
      AuthRegisterInput: {
        type: "object",
        required: ["nome", "email", "senha"],
        properties: {
          nome: { type: "string", example: "Joao" },
          email: { type: "string", format: "email", example: "joao@email.com" },
          senha: { type: "string", minLength: 8, example: "12345678" }
        }
      },
      AuthLoginInput: {
        type: "object",
        required: ["email", "senha"],
        properties: {
          email: { type: "string", format: "email", example: "joao@email.com" },
          senha: { type: "string", example: "12345678" }
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
      UpdateLivroInput: {
        type: "object",
        properties: {
          titulo: { type: "string", example: "Clean Code - 2a Edicao" },
          autor: { type: "string", example: "Robert C. Martin" },
          isbn: { type: "string", example: "978-0132350884" },
          ano: { type: "integer", example: 2009 },
          categoria: { type: "string", example: "Engenharia de Software" },
          status: { type: "string", enum: ["disponivel", "emprestado", "inativo"], example: "disponivel" },
          estadoConservacao: { type: "string", example: "otimo" }
        }
      },
      UsuarioInput: {
        type: "object",
        required: ["nome", "email", "senha"],
        properties: {
          nome: { type: "string", example: "Joao Silva" },
          email: { type: "string", format: "email", example: "joao@email.com" },
          senha: { type: "string", minLength: 8, example: "12345678" }
        }
      },
      CreateEmprestimoInput: {
        type: "object",
        required: ["livroId", "usuarioId"],
        properties: {
          livroId: { type: "string", format: "uuid", example: "2f1eb74e-35e2-4d45-9127-e87f2ef5545d" },
          usuarioId: { type: "string", format: "uuid", example: "7a48e4c9-5abc-431e-bf45-8f8d3f9ae4b6" }
        }
      },
      RegistrarDevolucaoInput: {
        type: "object",
        properties: {
          dataDevolucaoReal: { type: "string", format: "date-time", example: "2026-03-20T10:30:00.000Z" }
        }
      },
      AuthResponse: {
        type: "object",
        properties: {
          token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          usuario: { $ref: "#/components/schemas/Usuario" }
        }
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string", example: "Falha na operacao" },
          error: {
            type: "object",
            properties: {
              code: { type: "string", example: "APP_ERROR" },
              details: { nullable: true }
            }
          }
        }
      }
    }
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Registrar usuario",
        description: "Cria conta de usuario com senha e retorna token JWT.",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthRegisterInput" },
              examples: {
                default: {
                  value: {
                    nome: "Joao",
                    email: "joao@email.com",
                    senha: "12345678"
                  }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Usuario registrado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Usuario registrado com sucesso" },
                    data: { $ref: "#/components/schemas/AuthResponse" },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "400": {
            description: "Payload invalido",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          "409": {
            description: "Email ja cadastrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                examples: {
                  emailDuplicado: {
                    value: {
                      success: false,
                      message: "Email ja cadastrado",
                      error: { code: "EMAIL_JA_CADASTRADO", details: null }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login do usuario",
        description: "Autentica usuario com email e senha e retorna token JWT.",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthLoginInput" },
              examples: {
                default: {
                  value: {
                    email: "joao@email.com",
                    senha: "12345678"
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Login realizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Login realizado com sucesso" },
                    data: { $ref: "#/components/schemas/AuthResponse" },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "401": {
            description: "Credenciais invalidas",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Dados do usuario autenticado",
        description: "Retorna os dados do usuario autenticado a partir do token JWT.",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Usuario autenticado consultado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Usuario autenticado consultado com sucesso" },
                    data: { $ref: "#/components/schemas/Usuario" },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "401": {
            description: "Token ausente, invalido ou expirado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/livros": {
      get: {
        tags: ["Livros"],
        summary: "Listar livros",
        description: "Lista livros com filtros opcionais por titulo, autor, categoria e status.",
        security: [],
        parameters: [
          { in: "query", name: "titulo", schema: { type: "string" }, required: false },
          { in: "query", name: "autor", schema: { type: "string" }, required: false },
          { in: "query", name: "categoria", schema: { type: "string" }, required: false },
          { in: "query", name: "status", schema: { type: "string", enum: ["disponivel", "emprestado", "inativo"] }, required: false }
        ],
        responses: {
          "200": {
            description: "Livros listados com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Livros listados com sucesso" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Livro" }
                    },
                    meta: { nullable: true }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Livros"],
        summary: "Criar livro",
        description: "Cria um novo livro no catalogo. Requer perfil LIBRARIAN.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LivroInput" }
            }
          }
        },
        responses: {
          "201": {
            description: "Livro criado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Livro criado com sucesso" },
                    data: { $ref: "#/components/schemas/Livro" },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "401": {
            description: "Nao autenticado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          "403": {
            description: "Sem permissao",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/livros/{id}": {
      get: {
        tags: ["Livros"],
        summary: "Consultar livro por ID",
        description: "Retorna os detalhes de um livro.",
        security: [],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          "200": {
            description: "Livro consultado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Livro consultado com sucesso" },
                    data: { $ref: "#/components/schemas/Livro" },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "404": {
            description: "Livro nao encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      },
      put: {
        tags: ["Livros"],
        summary: "Atualizar livro",
        description: "Atualiza dados de um livro. Requer perfil LIBRARIAN.",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateLivroInput" }
            }
          }
        },
        responses: {
          "200": {
            description: "Livro atualizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Livro atualizado com sucesso" },
                    data: { $ref: "#/components/schemas/Livro" },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "401": {
            description: "Nao autenticado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          "403": {
            description: "Sem permissao",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      },
      delete: {
        tags: ["Livros"],
        summary: "Remover livro",
        description: "Remove logicamente um livro. Requer perfil LIBRARIAN.",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          "200": {
            description: "Livro removido com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Livro removido com sucesso" },
                    data: { nullable: true, example: null },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "401": {
            description: "Nao autenticado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          "403": {
            description: "Sem permissao",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/usuarios": {
      get: {
        tags: ["Usuarios"],
        summary: "Listar usuarios",
        description: "Lista usuarios ativos.",
        security: [],
        responses: {
          "200": {
            description: "Usuarios listados com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Usuarios listados com sucesso" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Usuario" }
                    },
                    meta: { nullable: true }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Usuarios"],
        summary: "Criar usuario",
        description: "Cria um novo usuario com senha hash.",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsuarioInput" }
            }
          }
        },
        responses: {
          "201": {
            description: "Usuario criado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Usuario criado com sucesso" },
                    data: { $ref: "#/components/schemas/Usuario" },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "409": {
            description: "Email ja cadastrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/usuarios/{id}": {
      get: {
        tags: ["Usuarios"],
        summary: "Consultar usuario por ID",
        description: "Retorna o perfil de um usuario.",
        security: [],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          "200": {
            description: "Perfil consultado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Perfil consultado com sucesso" },
                    data: { $ref: "#/components/schemas/Usuario" },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "404": {
            description: "Usuario nao encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      },
      delete: {
        tags: ["Usuarios"],
        summary: "Remover usuario",
        description: "Remove logicamente um usuario.",
        security: [],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          "200": {
            description: "Usuario removido com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Usuario removido com sucesso" },
                    data: { nullable: true, example: null },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "404": {
            description: "Usuario nao encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/usuarios/{id}/historico-emprestimos": {
      get: {
        tags: ["Usuarios"],
        summary: "Historico de emprestimos do usuario",
        description: "Lista o historico de emprestimos de um usuario.",
        security: [],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: {
          "200": {
            description: "Historico consultado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Historico consultado com sucesso" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Emprestimo" }
                    },
                    meta: { nullable: true }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/emprestimos": {
      post: {
        tags: ["Emprestimos"],
        summary: "Criar emprestimo",
        description: "Cria emprestimo de livro para usuario autenticado.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateEmprestimoInput" }
            }
          }
        },
        responses: {
          "201": {
            description: "Emprestimo criado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Emprestimo criado com sucesso" },
                    data: { $ref: "#/components/schemas/Emprestimo" },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "401": {
            description: "Nao autenticado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/emprestimos/ativos": {
      get: {
        tags: ["Emprestimos"],
        summary: "Listar emprestimos ativos",
        description: "Retorna a lista de emprestimos com status ativo.",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Emprestimos ativos listados com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Emprestimos ativos listados com sucesso" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Emprestimo" }
                    },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "401": {
            description: "Nao autenticado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/emprestimos/{id}/devolucao": {
      post: {
        tags: ["Emprestimos"],
        summary: "Registrar devolucao",
        description: "Registra devolucao de um emprestimo ativo.",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegistrarDevolucaoInput" }
            }
          }
        },
        responses: {
          "200": {
            description: "Devolucao registrada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Devolucao registrada com sucesso" },
                    data: { $ref: "#/components/schemas/Emprestimo" },
                    meta: { nullable: true }
                  }
                }
              }
            }
          },
          "401": {
            description: "Nao autenticado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    }
  }
};

const options: swaggerJSDoc.Options = {
  definition: swaggerDefinition,
  apis: ["./src/modules/**/*.routes.ts", "./src/app/routes/**/*.ts"]
};

export const swaggerSpec = swaggerJSDoc(options);
