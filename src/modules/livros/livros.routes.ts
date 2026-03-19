import { Router } from "express";

import { prismaClient } from "../../infrastructure/database/prisma/client";
import { LivrosController } from "./controller/livros.controller";
import { PrismaLivrosRepository } from "./repository/prisma-livros.repository";
import { LivrosService } from "./service/livros.service";

// Injeta PrismaClient na implementacao concreta do repositorio.
const livrosRepository = new PrismaLivrosRepository(prismaClient);
const livrosService = new LivrosService(livrosRepository);
const livrosController = new LivrosController(livrosService);

export const livrosRouter = Router();

livrosRouter.post("/", livrosController.create);
livrosRouter.get("/", livrosController.list);
livrosRouter.get("/:id", livrosController.getById);
livrosRouter.put("/:id", livrosController.update);
livrosRouter.delete("/:id", livrosController.delete);
