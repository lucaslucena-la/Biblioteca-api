# controller

## 📖 Descrição
Camada HTTP do módulo de usuários.

## 🧩 Responsabilidades
- Receber requisições HTTP e extrair dados necessários.
- Chamar o service correspondente.
- Retornar resposta padronizada ao cliente.

## 📂 Arquivos
- `usuarios.controller.ts`: handlers de endpoints de usuários.

## 🔄 Fluxo dentro da aplicação
As rotas chamam o controller. O controller delega para `UsuariosService`, sem conter regra de negócio.

## ⚠️ Boas práticas
- Não implementar regra de negócio nesta pasta.
- Não acessar banco diretamente.
- Evitar acoplamento com infraestrutura.
