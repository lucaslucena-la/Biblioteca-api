# controller

## 📖 Descrição
Camada HTTP do módulo de livros. Recebe requisições, extrai parâmetros e delega processamento para o service.

## 🧩 Responsabilidades
- Interpretar entrada HTTP (body, params, query).
- Chamar métodos do service.
- Retornar resposta JSON padronizada.

## 📂 Arquivos
- `livros.controller.ts`: handlers dos endpoints de livros.

## 🔄 Fluxo dentro da aplicação
Rotas do módulo acionam o controller. O controller não processa regra de negócio; apenas encaminha para `LivrosService` e devolve a resposta.

## ⚠️ Boas práticas
- Não implementar regra de negócio nesta pasta.
- Não acessar banco de dados diretamente.
- Manter handlers curtos e focados em protocolo HTTP.
