# http

## 📖 Descrição
Pasta com helpers para padronização de respostas HTTP JSON da API.

## 🧩 Responsabilidades
- Definir envelope padrão de sucesso e erro.
- Reduzir duplicação de estrutura de resposta nos controllers.

## 📂 Arquivos
- `api-response.ts`: funções utilitárias para respostas `success` e `error`.

## 🔄 Fluxo dentro da aplicação
Controllers usam os helpers desta pasta para retornar respostas uniformes. Middlewares também reutilizam essas funções para erros globais.

## ⚠️ Boas práticas
- Não implementar regra de negócio.
- Não acessar banco ou serviços externos.
- Manter contratos de resposta consistentes em toda a API.
