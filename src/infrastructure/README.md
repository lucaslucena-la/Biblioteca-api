# infrastructure

## 📖 Descrição
Camada de infraestrutura responsável por integrações técnicas externas, como banco de dados e clientes de serviços.

## 🧩 Responsabilidades
- Implementar detalhes técnicos de persistência.
- Expor adaptadores concretos para interfaces das camadas internas.
- Isolar tecnologia (Prisma/PostgreSQL) do domínio e aplicação.

## 📂 Arquivos
- `database/`: configuração e clientes de acesso ao banco.

## 🔄 Fluxo dentro da aplicação
Services dependem de contratos (interfaces) e recebem implementações concretas da infraestrutura via composição nas rotas/app.

## ⚠️ Boas práticas
- Não colocar regra de negócio nesta camada.
- Evitar expor detalhes técnicos para controllers/services.
- Manter implementações orientadas a contratos.
