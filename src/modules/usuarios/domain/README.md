# domain

## 📖 Descrição
Camada de domínio do módulo de usuários.

## 🧩 Responsabilidades
- Definir a entidade central do contexto.
- Padronizar estrutura de dados de usuário para o módulo.

## 📂 Arquivos
- `usuario.entity.ts`: tipo de entidade de usuário.

## 🔄 Fluxo dentro da aplicação
Repositories convertem dados persistidos para entidade de domínio. Services e controllers consomem essa estrutura para operações internas.

## ⚠️ Boas práticas
- Não incluir dependências de framework/ORM.
- Manter domínio estável e orientado ao negócio.
- Não misturar contratos HTTP com entidade de domínio.
