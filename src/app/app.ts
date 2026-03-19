import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { mainRouter } from "./routes";
import { swaggerSpec } from "../config/swagger";
import { errorHandler } from "../shared/middleware/error-handler";
import { notFoundHandler } from "../shared/middleware/not-found";

// Esta função cria e configura a aplicação Express, definindo os middlewares e rotas necessários.
export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api", mainRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

// Export default da aplicação para execução em ambiente serverless.
const app = createApp();

export default app;
