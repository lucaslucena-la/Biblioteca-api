# 20260318000000_initial_schema

## Descrição
Migration inicial que cria a estrutura base do banco para o sistema de biblioteca.

## Responsabilidades
- Criar tabelas `Livro`, `Usuario` e `Emprestimo`.
- Criar índices iniciais de consulta.
- Criar chave única de e-mail em usuário.
- Definir relacionamentos entre empréstimos, livros e usuários.

## Arquivos
- `migration.sql`: script SQL base de criação do schema inicial.

## Fluxo dentro da aplicação
Essa migration precisa ser aplicada antes das migrations de integridade avançada para que constraints incrementais sejam executadas com sucesso.

## Boas práticas
- Tratar essa migration como baseline do banco.
- Não editar depois de aplicada em ambientes compartilhados.
- Evoluir schema apenas com novas migrations.
