# dto

## 📖 Descrição
Pasta dos Data Transfer Objects do módulo de livros, usados para contratos de entrada e atualização.

## 🧩 Responsabilidades
- Definir formato dos dados aceitos/retornados na aplicação.
- Separar contratos de transporte da entidade de domínio.

## 📂 Arquivos
- `livros.dto.ts`: DTOs para criação e atualização de livros.

## 🔄 Fluxo dentro da aplicação
Controller recebe payload HTTP e repassa ao service usando DTOs. Repository utiliza os mesmos contratos para operações de escrita no banco.

## ⚠️ Boas práticas
- Não incluir lógica de negócio em DTO.
- Evitar dependência de ORM ou camada HTTP nesta pasta.
- Manter contratos simples e explícitos.
