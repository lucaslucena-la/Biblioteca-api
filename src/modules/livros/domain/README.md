# domain

## 📖 Descrição
Camada de domínio do módulo de livros, com tipos e conceitos centrais do negócio.

## 🧩 Responsabilidades
- Representar a entidade de livro.
- Definir estrutura canônica usada pelas demais camadas.

## 📂 Arquivos
- `livro.entity.ts`: tipo da entidade de livro.

## 🔄 Fluxo dentro da aplicação
Repository mapeia dados do banco para a entidade de domínio. Service e controller usam essa estrutura para troca de dados interna.

## ⚠️ Boas práticas
- Evitar dependências de framework/ORM.
- Manter domínio independente de detalhes de infraestrutura.
- Centralizar conceitos de negócio nesta camada.
