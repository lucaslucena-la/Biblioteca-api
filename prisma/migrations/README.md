# migrations

## Descrição
Esta pasta armazena o histórico de migrations SQL do banco de dados.

## Responsabilidades
- Registrar alterações incrementais de schema.
- Aplicar constraints, índices e ajustes de dados.
- Permitir rastreabilidade e rollback estratégico por histórico.

## Arquivos
- `20260318000000_initial_schema/`: migration base com criação das tabelas, índices e relacionamentos iniciais.
- `20260319000000_hard_constraints_integrity/`: migration para reforço de integridade (ISBN ativo único, empréstimo ativo único por livro e checks de status).
- `20260319010054_sync_schema_indexes/`: migration de sincronização automática do Prisma para índice auxiliar em `isbnNormalizado`.

## Fluxo dentro da aplicação
Cada migration é executada em ordem cronológica para sincronizar o PostgreSQL com as regras de integridade do sistema.

## Boas práticas
- Não editar migrations já aplicadas em ambientes compartilhados.
- Criar nova migration para qualquer mudança adicional.
- Incluir backfill quando adicionar colunas obrigatórias.
