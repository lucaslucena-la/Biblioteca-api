# dto

## 📖 Descrição
Pasta de DTOs do módulo de empréstimos.

## 🧩 Responsabilidades
- Definir contratos de entrada e atualização para endpoints do módulo.
- Separar estrutura de transporte da entidade de domínio.

## 📂 Arquivos
- `emprestimos.dto.ts`: DTOs para criação de empréstimo e registro de devolução.

## 🔄 Fluxo dentro da aplicação
Controller recebe payload HTTP e o repassa ao service com base nos DTOs. Repository utiliza os contratos para persistência quando aplicável.

## ⚠️ Boas práticas
- Não colocar regra de negócio em DTO.
- Não acoplar DTO à infraestrutura.
- Manter contratos explícitos e previsíveis.
