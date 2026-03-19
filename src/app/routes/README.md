# routes

## 📖 Descrição
Esta pasta define o roteamento principal da API, centralizando endpoints transversais (ex.: health check) e a montagem das rotas de cada módulo.

## 🧩 Responsabilidades
- Mapear caminhos HTTP para os módulos do sistema.
- Compor roteadores por contexto (`livros`, `usuarios`, `emprestimos`).
- Manter o ponto único de entrada de rotas da aplicação.

## 📂 Arquivos
- `index.ts`: define `mainRouter`, endpoint de health e acopla as rotas de módulos.

## 🔄 Fluxo dentro da aplicação
`app.ts` registra o roteador principal desta pasta. O `index.ts` distribui a requisição para o controller do módulo correto, seguindo o fluxo `controller -> service -> repository`.

## ⚠️ Boas práticas
- Não implementar regra de negócio em arquivos de rota.
- Evitar lógica de persistência aqui.
- Manter rotas enxutas e orientadas a composição.
