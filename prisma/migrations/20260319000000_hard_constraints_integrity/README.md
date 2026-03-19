# 20260319000000_hard_constraints_integrity

## Descrição
Migration focada em integridade forte para cenários concorrentes de produção.

## Responsabilidades
- Adicionar coluna `isbnNormalizado` e preencher dados existentes.
- Garantir ISBN único entre livros ativos via índice único parcial.
- Garantir um único empréstimo ativo por livro via índice único parcial.
- Aplicar checks de domínio e consistência de estado.

## Arquivos
- `migration.sql`: script SQL completo da migration.

## Fluxo dentro da aplicação
Executada durante o processo de migrate para alinhar o banco com invariantes críticas que não devem depender apenas de service.

## Boas práticas
- Validar dados legados antes de aplicar em produção.
- Monitorar falhas por violação de constraint após deploy.
- Evitar mudanças manuais fora do histórico de migrations.
