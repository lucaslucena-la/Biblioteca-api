# middleware

## 📖 Descrição
Pasta de middlewares globais da aplicação HTTP. Trata preocupações transversais independentes do domínio.

## 🧩 Responsabilidades
- Tratar erros não capturados de forma centralizada.
- Retornar resposta para rotas inexistentes.

## 📂 Arquivos
- `error-handler.ts`: middleware global de tratamento de exceções.
- `not-found.ts`: middleware para retorno de rota não encontrada.

## 🔄 Fluxo dentro da aplicação
`app.ts` registra esses middlewares ao final da cadeia. Após controller/service/repository, qualquer erro sobe para `error-handler`; requisições sem rota caem em `not-found`.

## ⚠️ Boas práticas
- Não inserir regra de negócio em middlewares globais.
- Não acoplar middleware a um módulo específico.
- Manter middlewares idempotentes e previsíveis.
