-- Adiciona coluna de ISBN normalizado para garantir unicidade sem depender da aplicacao.
ALTER TABLE "Livro"
ADD COLUMN "isbnNormalizado" TEXT;

-- Backfill da coluna nova a partir do ISBN atual.
UPDATE "Livro"
SET "isbnNormalizado" = UPPER(REGEXP_REPLACE(COALESCE("isbn", ''), '[^0-9A-Za-z]', '', 'g'));

-- Torna o campo obrigatorio apos backfill.
ALTER TABLE "Livro"
ALTER COLUMN "isbnNormalizado" SET NOT NULL;

-- Funcao utilitaria para normalizacao de ISBN no banco.
CREATE OR REPLACE FUNCTION normalize_isbn(input_value TEXT)
RETURNS TEXT
LANGUAGE SQL
IMMUTABLE
RETURNS NULL ON NULL INPUT
AS $$
  SELECT UPPER(REGEXP_REPLACE(input_value, '[^0-9A-Za-z]', '', 'g'));
$$;

-- Trigger para manter isbnNormalizado consistente em inserts/updates.
CREATE OR REPLACE FUNCTION set_livro_isbn_normalizado()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW."isbnNormalizado" := normalize_isbn(NEW."isbn");
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_set_livro_isbn_normalizado ON "Livro";

CREATE TRIGGER trg_set_livro_isbn_normalizado
BEFORE INSERT OR UPDATE OF "isbn"
ON "Livro"
FOR EACH ROW
EXECUTE FUNCTION set_livro_isbn_normalizado();

-- Unicidade de ISBN entre livros ativos (soft delete).
CREATE UNIQUE INDEX "livro_isbn_normalizado_ativo_unique"
ON "Livro" ("isbnNormalizado")
WHERE "ativo" = TRUE;

-- Garante apenas um emprestimo ativo por livro.
CREATE UNIQUE INDEX "emprestimo_livro_ativo_unique"
ON "Emprestimo" ("livroId")
WHERE "status" = 'ativo';

-- Garante dominio de status de Livro.
ALTER TABLE "Livro"
ADD CONSTRAINT "livro_status_check"
CHECK ("status" IN ('disponivel', 'emprestado', 'inativo'));

-- Garante dominio de status de Emprestimo.
ALTER TABLE "Emprestimo"
ADD CONSTRAINT "emprestimo_status_check"
CHECK ("status" IN ('ativo', 'devolvido'));

-- Garante consistencia de estado: devolvido exige data de devolucao.
ALTER TABLE "Emprestimo"
ADD CONSTRAINT "emprestimo_devolucao_data_check"
CHECK ("status" <> 'devolvido' OR "dataDevolucaoReal" IS NOT NULL);
