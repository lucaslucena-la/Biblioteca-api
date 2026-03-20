import { Router } from "express";

import { prismaClient } from "../../infrastructure/database/prisma/client";
import { authMiddleware } from "../../shared/middleware/auth";
import { AuthController } from "./controller/auth.controller";
import { PrismaUsuariosRepository } from "../usuarios/repository/prisma-usuarios.repository";
import { AuthService } from "./service/auth.service";

const usuariosRepository = new PrismaUsuariosRepository(prismaClient);
const authService = new AuthService(usuariosRepository);
const authController = new AuthController(authService);

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authMiddleware, authController.me);
