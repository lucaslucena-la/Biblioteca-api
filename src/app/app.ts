import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { mainRouter } from "./routes";
import { swaggerSpec } from "../config/swagger";
import { errorHandler } from "../shared/middleware/error-handler";
import { notFoundHandler } from "../shared/middleware/not-found";

const SWAGGER_ROUTE = "/api-docs";

// Esta função cria e configura a aplicação Express, definindo os middlewares e rotas necessários.
export function createApp() {
  const app = express();
  app.set("trust proxy", 1);

  app.use(cors());
  app.use(express.json());

  app.get("/", (request, response) => {
    const host = request.headers.host ?? "localhost:3000";
    const destination = `${request.protocol}://${host}${SWAGGER_ROUTE}`;

    return response.redirect(destination);
  });

  app.get("/swagger.json", (_request, response) => {
    return response.json(swaggerSpec);
  });

  app.use(SWAGGER_ROUTE, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api", mainRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

// Export default da aplicação para execução em ambiente serverless.
const app = createApp();

export default app;
