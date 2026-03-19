# config

## Descrição
Pasta com configurações de infraestrutura e integração da aplicação, sem lógica de negócio.

## Responsabilidades
- Centralizar configurações reutilizáveis da aplicação.
- Disponibilizar especificações técnicas de integração (ex.: documentação OpenAPI).

## Arquivos
- `swagger.ts`: configuração OpenAPI 3.0 e definição dos endpoints documentados no Swagger.

## Fluxo dentro da aplicação
`app.ts` importa as configurações desta pasta para registrar middlewares e recursos transversais, como a UI de documentação em `/api/docs`.

## Boas práticas
- Não colocar regras de negócio nesta pasta.
- Não acessar banco diretamente aqui.
- Manter configurações desacopladas de controllers/services.
