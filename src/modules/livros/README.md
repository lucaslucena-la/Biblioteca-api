# livros

## 📖 Descrição
Módulo responsável pelo contexto de livros, incluindo operações de cadastro, consulta, atualização e remoção lógica.

## 🧩 Responsabilidades
- Expor endpoints HTTP do contexto de livros.
- Orquestrar casos de uso via service.
- Persistir dados por contrato de repository.

## 📂 Arquivos
- `livros.routes.ts`: rotas HTTP do módulo e composição das dependências.
- `controller/`: camada de entrada HTTP.
- `service/`: camada de aplicação/casos de uso.
- `repository/`: contratos e implementações de persistência.
- `domain/`: entidades do domínio de livros.
- `dto/`: contratos de dados de entrada/saída.

## 🔄 Fluxo dentro da aplicação
`livros.routes.ts` direciona para o controller, que delega ao service. O service usa `ILivrosRepository`, implementado por `PrismaLivrosRepository` para acessar banco.

## ⚠️ Boas práticas
- Não colocar regra de negócio em rotas/controller.
- Service deve depender de interface, não de Prisma.
- Repository não deve conter decisões de negócio.
