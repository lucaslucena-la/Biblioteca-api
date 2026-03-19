# repository

## 📖 Descrição
Camada de persistência do módulo de empréstimos.

## 🧩 Responsabilidades
- Definir interface `IEmprestimosRepository`.
- Implementar operações de leitura/escrita com Prisma.
- Converter modelo persistido em entidade do domínio.

## 📂 Arquivos
- `emprestimos.repository.ts`: contrato do repositório e tipos de atualização.
- `prisma-emprestimos.repository.ts`: implementação concreta com Prisma.

## 🔄 Fluxo dentro da aplicação
`EmprestimosService` usa apenas a interface do repositório. A implementação Prisma é injetada na composição em `emprestimos.routes.ts`.

## ⚠️ Boas práticas
- Não colocar regra de negócio aqui.
- Manter camada focada em acesso a dados.
- Não expor detalhes de ORM para camadas superiores.
