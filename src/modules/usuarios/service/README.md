# service

## 📖 Descrição
Camada de aplicação do módulo de usuários.

## 🧩 Responsabilidades
- Orquestrar casos de uso do módulo.
- Aplicar regras de negócio do contexto (quando implementadas).
- Integrar com o contrato `IUsuariosRepository`.

## 📂 Arquivos
- `usuarios.service.ts`: serviço principal de usuários.

## 🔄 Fluxo dentro da aplicação
Controller delega para o service. O service coordena a operação e consulta/persiste dados via interface de repository.

## ⚠️ Boas práticas
- Colocar decisões de negócio nesta camada.
- Não depender diretamente de Prisma ou HTTP.
- Manter métodos orientados a caso de uso.
