import "dotenv/config";

import app from "./app";
import { prismaClient } from "../infrastructure/database/prisma/client";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await prismaClient.$connect();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "fatal",
        message: "Failed to start API",
        code: "BOOTSTRAP_ERROR",
        details: error instanceof Error ? error.message : String(error)
      })
    );

    process.exit(1);
  }
}

bootstrap();
