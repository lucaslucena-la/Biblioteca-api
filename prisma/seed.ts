import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

function normalizeIsbn(isbn: string): string {
  return isbn.replace(/[^0-9a-z]/gi, "").toUpperCase();
}

async function upsertLivro(params: {
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
  categoria: string;
  status: "disponivel" | "emprestado" | "inativo";
  estadoConservacao: string;
}) {
  const isbnNormalizado = normalizeIsbn(params.isbn);

  const existing = await prisma.livro.findFirst({
    where: {
      isbnNormalizado,
      ativo: true
    }
  });

  if (existing) {
    return prisma.livro.update({
      where: {
        id: existing.id
      },
      data: {
        titulo: params.titulo,
        autor: params.autor,
        isbn: params.isbn,
        isbnNormalizado,
        ano: params.ano,
        categoria: params.categoria,
        status: params.status,
        estadoConservacao: params.estadoConservacao,
        ativo: true
      }
    });
  }

  return prisma.livro.create({
    data: {
      titulo: params.titulo,
      autor: params.autor,
      isbn: params.isbn,
      isbnNormalizado,
      ano: params.ano,
      categoria: params.categoria,
      status: params.status,
      estadoConservacao: params.estadoConservacao,
      ativo: true
    }
  });
}

async function main() {
  await prisma.emprestimo.deleteMany();

  const senhaPadrao = await bcrypt.hash("Senha@123", 10);

  const ana = await prisma.usuario.upsert({
    where: { email: "ana@biblioteca.local" },
    update: { nome: "Ana Silva", ativo: true, senha: senhaPadrao, role: "USER" } as never,
    create: {
      nome: "Ana Silva",
      email: "ana@biblioteca.local",
      senha: senhaPadrao,
      role: "USER",
      ativo: true
    } as never
  });

  const bruno = await prisma.usuario.upsert({
    where: { email: "bruno@biblioteca.local" },
    update: { nome: "Bruno Costa", ativo: true, senha: senhaPadrao, role: "LIBRARIAN" } as never,
    create: {
      nome: "Bruno Costa",
      email: "bruno@biblioteca.local",
      senha: senhaPadrao,
      role: "LIBRARIAN",
      ativo: true
    } as never
  });

  const livroAtivo = await upsertLivro({
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    isbn: "978-0132350884",
    ano: 2008,
    categoria: "Engenharia de Software",
    status: "emprestado",
    estadoConservacao: "bom"
  });

  const livroDisponivel = await upsertLivro({
    titulo: "Domain-Driven Design",
    autor: "Eric Evans",
    isbn: "978-0321125217",
    ano: 2003,
    categoria: "Arquitetura",
    status: "disponivel",
    estadoConservacao: "otimo"
  });

  const livroHistorico = await upsertLivro({
    titulo: "Refactoring",
    autor: "Martin Fowler",
    isbn: "978-0201485677",
    ano: 1999,
    categoria: "Boas Praticas",
    status: "disponivel",
    estadoConservacao: "regular"
  });

  const now = new Date();
  const prev = new Date(now);
  prev.setDate(prev.getDate() - 14);
  const due = new Date(now);
  due.setDate(due.getDate() + 14);

  await prisma.emprestimo.create({
    data: {
      livroId: livroAtivo.id,
      usuarioId: ana.id,
      status: "ativo",
      dataEmprestimo: now,
      dataPrevistaDevolucao: due
    }
  });

  await prisma.emprestimo.create({
    data: {
      livroId: livroHistorico.id,
      usuarioId: bruno.id,
      status: "devolvido",
      dataEmprestimo: prev,
      dataPrevistaDevolucao: now,
      dataDevolucaoReal: now
    }
  });

  console.log("Seed concluido com sucesso.");
  console.log(`Usuarios: ${ana.email}, ${bruno.email}`);
  console.log(`Livros: ${livroAtivo.titulo}, ${livroDisponivel.titulo}, ${livroHistorico.titulo}`);
}

main()
  .catch((error) => {
    console.error("Falha ao executar seed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
