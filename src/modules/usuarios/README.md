# usuarios

## 📖 Descrição
Módulo responsável pelo contexto de usuários da biblioteca comunitária.

## 🧩 Responsabilidades
- Expor endpoints de criação, consulta de perfil e histórico.
- Orquestrar casos de uso do contexto de usuários.
- Persistir dados por contratos de repositório.

## 📂 Arquivos
- `usuarios.routes.ts`: rotas HTTP e composição de dependências do módulo.
- `controller/`: entrada HTTP do módulo.
- `service/`: orquestração de casos de uso.
- `repository/`: contratos e implementação de persistência.
- `domain/`: entidade do contexto de usuários.
- `dto/`: contratos de dados.

## 🔄 Fluxo dentro da aplicação
As rotas direcionam para controller, que delega ao service. O service depende de `IUsuariosRepository`; a implementação Prisma é injetada na composição.

## ⚠️ Boas práticas
- Evitar lógica de negócio em controller e repository.
- Manter service dependente de interface.
- Preservar separação entre contrato e implementação.
