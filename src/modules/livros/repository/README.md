# repository

## 📖 Descrição
Camada de persistência do módulo de livros. Define contratos e implementações de acesso ao banco.

## 🧩 Responsabilidades
- Definir interface de repositório (`ILivrosRepository`).
- Implementar operações com Prisma sem regra de negócio.
- Traduzir modelos de persistência para entidades do domínio.
- Normalizar `isbn` para `isbnNormalizado` antes de operações de escrita.

## 📂 Arquivos
- `livros.repository.ts`: contrato de persistência e tipos auxiliares de filtro.
- `prisma-livros.repository.ts`: implementação concreta com Prisma.

## 🔄 Fluxo dentro da aplicação
O service consome apenas o contrato do repository. A implementação Prisma é injetada na composição de dependências feita em `livros.routes.ts`.

## ⚠️ Boas práticas
- Não colocar lógica de negócio em repository.
- Não acoplar service ao Prisma diretamente.
- Garantir que o repository respeite o contrato definido.
