# 20260319010054_sync_schema_indexes

## Descrição
Migration de sincronização gerada para alinhar índices do schema Prisma com o banco.

## Responsabilidades
- Criar índice auxiliar de busca para `Livro.isbnNormalizado`.

## Arquivos
- `migration.sql`: script SQL gerado pelo Prisma para criação do índice.

## Fluxo dentro da aplicação
Executada após as migrations estruturais para manter o banco consistente com o `schema.prisma` atual.

## Boas práticas
- Manter esta migration no histórico para evitar novo drift de schema.
- Não remover índices gerados sem análise de impacto.
