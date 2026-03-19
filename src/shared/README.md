# shared

## 📖 Descrição
Pasta com componentes compartilhados entre módulos. Reúne utilitários globais, tratamento de erro e padrões de resposta HTTP reutilizáveis.

## 🧩 Responsabilidades
- Fornecer recursos transversais para toda a aplicação.
- Padronizar respostas e erros da API.
- Concentrar middlewares reutilizáveis.

## 📂 Arquivos
- `errors/`: classes de erro padronizadas da aplicação.
- `http/`: helpers de resposta JSON.
- `middleware/`: middlewares globais (erro e not-found).

## 🔄 Fluxo dentro da aplicação
Controllers e `app.ts` consomem utilitários de `shared` para padronizar comportamento de entrada/saída. Essa pasta apoia todas as camadas sem depender de regras de domínio.

## ⚠️ Boas práticas
- Não colocar regra de negócio específica de módulo.
- Evitar dependências circulares com módulos.
- Manter utilitários realmente genéricos.
