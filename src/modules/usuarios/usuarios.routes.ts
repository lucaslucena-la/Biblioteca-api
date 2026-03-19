import { Router } from "express";

import { prismaClient } from "../../infrastructure/database/prisma/client";
import { UsuariosController } from "./controller/usuarios.controller";
import { PrismaUsuariosRepository } from "./repository/prisma-usuarios.repository";
import { UsuariosService } from "./service/usuarios.service";

// Injeta PrismaClient na implementacao concreta do repositorio.
const usuariosRepository = new PrismaUsuariosRepository(prismaClient);
const usuariosService = new UsuariosService(usuariosRepository);
const usuariosController = new UsuariosController(usuariosService);

export const usuariosRouter = Router();

usuariosRouter.post("/", usuariosController.create);
usuariosRouter.get("/:id", usuariosController.getById);
usuariosRouter.get("/:id/historico-emprestimos", usuariosController.getHistoricoEmprestimos);
usuariosRouter.delete("/:id", usuariosController.delete);
