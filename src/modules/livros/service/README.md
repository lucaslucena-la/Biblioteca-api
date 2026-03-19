# service

## 📖 Descrição
Camada de aplicação do módulo de livros. Centraliza orquestração de casos de uso do contexto.

## 🧩 Responsabilidades
- Orquestrar operações do módulo.
- Encapsular regras de negócio do contexto (quando implementadas).
- Coordenar chamadas aos contratos de repository.
- Mapear erros de persistência para erros de domínio do módulo.

## 📂 Arquivos
- `livros.service.ts`: serviço principal do módulo de livros.

## 🔄 Fluxo dentro da aplicação
O controller chama o service para executar o caso de uso. O service usa `ILivrosRepository` para persistência, mantendo desacoplamento da infraestrutura.

## ⚠️ Boas práticas
- Concentrar regra de negócio nesta camada.
- Não depender de implementação concreta de ORM.
- Não retornar estruturas HTTP diretamente.
- Converter violações de constraint para erros de domínio claros.
