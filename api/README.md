# api

## Descrição
Pasta de entrypoints serverless para deploy na Vercel.

## Responsabilidades
- Expor o handler HTTP da aplicação sem iniciar servidor persistente.
- Conectar o runtime serverless ao app Express já existente.

## Arquivos
- `index.ts`: importa e exporta o app Express como default para a Vercel.

## Fluxo dentro da aplicação
As requisições roteadas por `vercel.json` para `/api/index.ts` são processadas pelo app Express em `src/app/app.ts`, preservando a arquitetura em camadas.

## Boas práticas
- Não colocar regra de negócio nesta pasta.
- Não iniciar `app.listen` em entrypoints serverless.
- Manter apenas bootstrap de integração com plataforma.
