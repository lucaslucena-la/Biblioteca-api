# emprestimos

## 📖 Descrição
Módulo responsável pelo contexto de empréstimos da biblioteca.

## 🧩 Responsabilidades
- Expor endpoints de criação, listagem de ativos e devolução.
- Orquestrar casos de uso do contexto de empréstimos.
- Persistir dados por interface de repositório.

## 📂 Arquivos
- `emprestimos.routes.ts`: rotas e composição de dependências.
- `controller/`: camada de entrada HTTP.
- `service/`: camada de aplicação.
- `repository/`: contratos e implementações de persistência.
- `domain/`: entidade de empréstimo.
- `dto/`: contratos de payload.

## 🔄 Fluxo dentro da aplicação
As rotas do módulo acionam o controller. O controller delega para o service, que aplica regras de negócio, executa transações via contrato de transaction manager e usa interfaces de repository para persistência.

## ⚠️ Boas práticas
- Não colocar regra de negócio em controller/repository.
- Isolar decisões de caso de uso na camada service.
- Manter desacoplamento via interfaces.
