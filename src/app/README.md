# app

## Descrição
Esta pasta concentra o bootstrap da aplicação HTTP. Aqui ficam a criação da instância do servidor, a composição de middlewares globais e o registro das rotas principais.

## Responsabilidades
- Compor e exportar a aplicação Express para consumo por runtimes serverless.
- Configurar middlewares globais (ex.: JSON parser, CORS, tratamento de erro).
- Registrar as rotas de entrada da API.
- Expor documentação interativa Swagger para consulta dos endpoints.

## Arquivos
- `app.ts`: monta a aplicação Express e registra middlewares/rotas, incluindo Swagger em `/api/docs`.
- `server.ts`: exporta o app para compatibilidade de import sem iniciar `listen`.
- `routes/`: subpasta com roteamento principal da API.

## Fluxo dentro da aplicação
Em ambiente serverless, o entrypoint da plataforma importa o app desta pasta. As requisições passam por `app.ts` e seguem para `routes/`, que delega para os módulos (`controller -> service -> repository`). O endpoint `/api/docs` serve a documentação Swagger da API.

## Boas práticas
- Não colocar regra de negócio nesta pasta.
- Não acessar banco diretamente nesta camada.
- Manter apenas responsabilidades de bootstrap e composição.
