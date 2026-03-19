# service

## 📖 Descrição
Camada de aplicação do módulo de empréstimos.

## 🧩 Responsabilidades
- Orquestrar casos de uso do contexto.
- Aplicar regras de negócio da operação.
- Consumir contrato `IEmprestimosRepository` para persistência.
- Coordenar execução transacional sem acoplamento ao Prisma.
- Mapear violações de constraints para erros de domínio.
- Executar retry automático para falhas transientes de transação.

## 📂 Arquivos
- `emprestimos.service.ts`: serviço principal de empréstimos.
- `emprestimos-transaction-manager.ts`: contrato de transação e contexto de repositories usados pelo service.

## 🔄 Fluxo dentro da aplicação
Controller chama o service. O service processa o caso de uso, executa transação via `IEmprestimosTransactionManager` e delega operações de dados aos repositories por interface.

## ⚠️ Boas práticas
- Concentrar regra de negócio nesta camada.
- Não depender de implementação concreta de banco.
- Não acessar `PrismaClient` diretamente no service.
- Evitar retorno acoplado a detalhes HTTP.
