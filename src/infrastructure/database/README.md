# database

## 📖 Descrição
Subcamada de infraestrutura focada em recursos de banco de dados.

## 🧩 Responsabilidades
- Agrupar configurações e clientes relacionados à persistência.
- Organizar dependências do ORM em local único.

## 📂 Arquivos
- `prisma/`: cliente Prisma e artefatos específicos da integração.

## 🔄 Fluxo dentro da aplicação
As implementações de repository consomem recursos desta pasta para executar operações de leitura/escrita no PostgreSQL.

## ⚠️ Boas práticas
- Não incluir regra de negócio aqui.
- Não acoplar código de domínio a detalhes de banco.
- Centralizar configuração de conexão para evitar duplicação.
