import { PrismaClient } from "@prisma/client";

// Extende o escopo global para armazenar singleton do Prisma Client.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Reutiliza a mesma instancia entre invocacoes para evitar excesso de conexoes.
export const prismaClient = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient;
}
