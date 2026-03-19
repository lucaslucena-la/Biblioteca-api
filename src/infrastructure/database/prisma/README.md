# prisma

## 📖 Descrição
Pasta com o cliente Prisma usado como porta de entrada para operações no banco PostgreSQL.

## 🧩 Responsabilidades
- Disponibilizar instância de `PrismaClient` para injeção nos repositories.
- Centralizar inicialização de cliente para evitar múltiplas instâncias desnecessárias.
- Reutilizar singleton em ambiente serverless para reduzir abertura excessiva de conexões.

## 📂 Arquivos
- `client.ts`: exporta instância singleton compartilhada do `PrismaClient`.
- `prisma-emprestimos-transaction-manager.ts`: implementação de transação para o módulo de empréstimos, com repositories escopados ao mesmo transaction client.

## 🔄 Fluxo dentro da aplicação
Rotas/composição instanciam repositories concretos (`Prisma*Repository`) e transaction managers injetando o cliente desta pasta. Services continuam desacoplados via interfaces.

## ⚠️ Boas práticas
- Não implementar regra de negócio no cliente Prisma.
- Não executar lógica de caso de uso aqui.
- Evitar criação de clientes Prisma fora deste ponto central.
