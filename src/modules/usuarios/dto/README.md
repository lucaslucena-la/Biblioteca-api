# dto

## 📖 Descrição
Pasta de contratos de dados (DTOs) do módulo de usuários.

## 🧩 Responsabilidades
- Definir formato de payload para operações do módulo.
- Tornar explícitos os contratos de entrada da aplicação.

## 📂 Arquivos
- `usuarios.dto.ts`: DTOs de criação de usuário.

## 🔄 Fluxo dentro da aplicação
Controller recebe dados HTTP e os encaminha ao service usando DTOs. Repository também utiliza esses contratos para persistência.

## ⚠️ Boas práticas
- Não conter regra de negócio.
- Não depender de infraestrutura.
- Manter contratos simples e tipados.
