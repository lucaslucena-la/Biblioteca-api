# errors

## 📖 Descrição
Pasta responsável por tipos de erro padronizados usados pela aplicação para comunicação consistente entre camadas.

## 🧩 Responsabilidades
- Definir classes de erro com metadados técnicos (status, código, detalhes).
- Facilitar o tratamento centralizado no middleware global.

## 📂 Arquivos
- `app-error.ts`: classe base de erro controlado da aplicação.

## 🔄 Fluxo dentro da aplicação
Services e controllers podem lançar `AppError`. O middleware global de erro converte esse erro em resposta JSON padronizada para o cliente.

## ⚠️ Boas práticas
- Não capturar/serializar HTTP diretamente aqui.
- Evitar mensagens acopladas a regras de negócio complexas.
- Manter códigos de erro claros e estáveis.
