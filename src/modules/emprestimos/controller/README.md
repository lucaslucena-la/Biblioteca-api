# controller

## 📖 Descrição
Camada HTTP do módulo de empréstimos.

## 🧩 Responsabilidades
- Receber requisições HTTP do contexto de empréstimos.
- Encaminhar dados para o service.
- Retornar respostas no padrão global da API.

## 📂 Arquivos
- `emprestimos.controller.ts`: handlers dos endpoints de empréstimos.

## 🔄 Fluxo dentro da aplicação
As rotas chamam os métodos do controller, que delegam para `EmprestimosService` seguindo o fluxo `controller -> service -> repository`.

## ⚠️ Boas práticas
- Não implementar regra de negócio nesta pasta.
- Não acessar Prisma/banco diretamente.
- Manter foco em protocolo HTTP.
