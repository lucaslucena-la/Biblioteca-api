# domain

## 📖 Descrição
Camada de domínio do módulo de empréstimos, com representação da entidade central do contexto.

## 🧩 Responsabilidades
- Definir estrutura da entidade de empréstimo.
- Padronizar dados de domínio usados por service e repository.

## 📂 Arquivos
- `emprestimo.entity.ts`: tipo da entidade de empréstimo.

## 🔄 Fluxo dentro da aplicação
Repository transforma dados do banco em entidade de domínio. Service utiliza essa entidade para orquestrar os casos de uso.

## ⚠️ Boas práticas
- Evitar dependência de framework/ORM.
- Manter conceitos de domínio separados de transporte HTTP.
- Preservar semântica de negócio no domínio.
