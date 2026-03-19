# repository

## 📖 Descrição
Camada de persistência do módulo de usuários.

## 🧩 Responsabilidades
- Definir o contrato `IUsuariosRepository`.
- Implementar consultas/escritas com Prisma.
- Retornar dados no formato de entidade de domínio.

## 📂 Arquivos
- `usuarios.repository.ts`: interface e contratos do repositório.
- `prisma-usuarios.repository.ts`: implementação concreta com Prisma.

## 🔄 Fluxo dentro da aplicação
`UsuariosService` usa a interface do repositório. A implementação Prisma é injetada na montagem do módulo (`usuarios.routes.ts`).

## ⚠️ Boas práticas
- Não implementar lógica de negócio no repository.
- Manter operações focadas em acesso a dados.
- Evitar expor detalhes técnicos para camadas superiores.
