-- Cria tabelas iniciais do dominio.
CREATE TABLE "Livro" (
  "id" TEXT NOT NULL,
  "titulo" TEXT NOT NULL,
  "autor" TEXT NOT NULL,
  "isbn" TEXT NOT NULL,
  "ano" INTEGER NOT NULL,
  "categoria" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "estadoConservacao" TEXT NOT NULL,
  "ativo" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Usuario" (
  "id" TEXT NOT NULL,
  "nome" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "ativo" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Emprestimo" (
  "id" TEXT NOT NULL,
  "livroId" TEXT NOT NULL,
  "usuarioId" TEXT NOT NULL,
  "dataEmprestimo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "dataPrevistaDevolucao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "dataDevolucaoReal" TIMESTAMP(3),
  "status" TEXT NOT NULL DEFAULT 'ativo',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Emprestimo_pkey" PRIMARY KEY ("id")
);

-- Indices basicos iniciais.
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE INDEX "Livro_ativo_idx" ON "Livro"("ativo");
CREATE INDEX "Livro_titulo_idx" ON "Livro"("titulo");
CREATE INDEX "Livro_autor_idx" ON "Livro"("autor");
CREATE INDEX "Livro_categoria_idx" ON "Livro"("categoria");
CREATE INDEX "Usuario_ativo_idx" ON "Usuario"("ativo");
CREATE INDEX "Emprestimo_livroId_status_idx" ON "Emprestimo"("livroId", "status");
CREATE INDEX "Emprestimo_usuarioId_status_idx" ON "Emprestimo"("usuarioId", "status");
CREATE INDEX "Emprestimo_status_idx" ON "Emprestimo"("status");

-- Relacionamentos.
ALTER TABLE "Emprestimo"
ADD CONSTRAINT "Emprestimo_livroId_fkey"
FOREIGN KEY ("livroId") REFERENCES "Livro"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Emprestimo"
ADD CONSTRAINT "Emprestimo_usuarioId_fkey"
FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
