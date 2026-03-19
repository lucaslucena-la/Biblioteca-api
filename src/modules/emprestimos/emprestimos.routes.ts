import { Router } from "express";

import { prismaClient } from "../../infrastructure/database/prisma/client";
import { PrismaEmprestimosTransactionManager } from "../../infrastructure/database/prisma/prisma-emprestimos-transaction-manager";
import { EmprestimosController } from "./controller/emprestimos.controller";
import { PrismaEmprestimosRepository } from "./repository/prisma-emprestimos.repository";
import { EmprestimosService } from "./service/emprestimos.service";

// Injeta PrismaClient na implementacao concreta do repositorio.
const emprestimosRepository = new PrismaEmprestimosRepository(prismaClient);
const emprestimosTransactionManager = new PrismaEmprestimosTransactionManager(prismaClient);
const emprestimosService = new EmprestimosService(emprestimosRepository, emprestimosTransactionManager);
const emprestimosController = new EmprestimosController(emprestimosService);

export const emprestimosRouter = Router();

emprestimosRouter.post("/", emprestimosController.create);
emprestimosRouter.get("/ativos", emprestimosController.listAtivos);
emprestimosRouter.post("/:id/devolucao", emprestimosController.registrarDevolucao);
