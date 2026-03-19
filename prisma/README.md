# prisma

## Descrição
Esta pasta concentra a modelagem de dados e o versionamento da estrutura de banco da aplicação usando Prisma + PostgreSQL.

## Responsabilidades
- Definir o modelo lógico no `schema.prisma`.
- Versionar alterações estruturais por migrations.
- Garantir compatibilidade entre aplicação e banco.
- Disponibilizar script de seed para carga inicial de dados de desenvolvimento.

## Arquivos
- `schema.prisma`: definição dos modelos, relações e índices suportados pelo Prisma.
- `migrations/`: histórico de mudanças estruturais aplicadas no banco.
- `seed.ts`: script de população inicial do banco para ambiente local.

## Fluxo dentro da aplicação
O Prisma Client é gerado a partir de `schema.prisma`. As migrations desta pasta materializam no PostgreSQL as garantias de integridade que não podem ficar apenas na aplicação.

## Boas práticas
- Não usar `db push` em produção.
- Sempre versionar mudanças por migration.
- Priorizar constraints de banco para invariantes críticas.
- Manter o seed idempotente para execução repetida em desenvolvimento.
