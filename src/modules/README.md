# modules

## 📖 Descrição
Pasta que organiza os contextos de negócio da aplicação por módulo funcional, mantendo coesão e isolamento por domínio.

## 🧩 Responsabilidades
- Separar funcionalidades por contexto (`livros`, `usuarios`, `emprestimos`).
- Aplicar o fluxo arquitetural `controller -> service -> repository` em cada módulo.
- Facilitar manutenção e evolução incremental do sistema.

## 📂 Arquivos
- `livros/`: módulo de gestão de livros.
- `usuarios/`: módulo de gestão de usuários.
- `emprestimos/`: módulo de gestão de empréstimos.

## 🔄 Fluxo dentro da aplicação
O roteamento principal (`app/routes`) delega para as rotas de cada módulo. Cada módulo executa seu fluxo interno em camadas até a persistência.

## ⚠️ Boas práticas
- Evitar dependência direta entre módulos sem contrato explícito.
- Não misturar responsabilidade de infraestrutura com domínio.
- Preservar fronteiras claras entre camadas.
