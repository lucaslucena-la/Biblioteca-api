# Sistema de Gestão de Biblioteca Comunitária

## Descrição
API RESTful em Node.js, Express, TypeScript, Prisma e PostgreSQL, estruturada por módulos e camadas (`controller -> service -> repository`).

## Como executar
- `npm install`
- `npx prisma migrate dev`
- `npm run dev`

## Deploy serverless (Vercel)
- `api/index.ts`: entrypoint serverless que exporta o app Express.
- `vercel.json`: roteia `/api/*` para `/api/index.ts`.
- Sem uso de `app.listen` no bootstrap da aplicação.

## Documentação da API
- Swagger UI: `http://localhost:3000/api/docs`

## Scripts principais
- `npm run dev`: inicia a API em desenvolvimento.
- `npm run build`: compila TypeScript para `dist`.
- `npm run prisma:generate`: gera o Prisma Client.
- `npm run prisma:seed`: executa carga inicial de dados.

## Boas práticas
- Não editar migrations já aplicadas.
- Manter regras de negócio na camada de service.
- Manter documentação e código sincronizados.
