import { Router } from "express";

import { authRouter } from "../../modules/auth/auth.routes";
import { emprestimosRouter } from "../../modules/emprestimos/emprestimos.routes";
import { livrosRouter } from "../../modules/livros/livros.routes";
import { usuariosRouter } from "../../modules/usuarios/usuarios.routes";
import { sendSuccess } from "../../shared/http/api-response";

export const mainRouter = Router();

mainRouter.get("/health", (_request, response) => {
  return sendSuccess(response, {
    message: "Service is healthy",
    data: {
      service: "biblioteca-comunitaria-api",
      status: "ok"
    }
  });
});

mainRouter.use("/livros", livrosRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/usuarios", usuariosRouter);
mainRouter.use("/emprestimos", emprestimosRouter);
