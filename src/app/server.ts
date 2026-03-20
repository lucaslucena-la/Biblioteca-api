import "dotenv/config";

const PORT = process.env.PORT || 3000;

function ensureDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return;
  }

  const fallbackDatabaseUrl =
    process.env.DATABASE_PRIVATE_URL ||
    process.env.DATABASE_PUBLIC_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL;

  if (fallbackDatabaseUrl) {
    process.env.DATABASE_URL = fallbackDatabaseUrl;
    return;
  }

  throw new Error(
    "DATABASE_URL nao configurado. Defina DATABASE_URL ou um fallback valido (DATABASE_PRIVATE_URL, DATABASE_PUBLIC_URL, POSTGRES_URL, POSTGRES_PRISMA_URL)."
  );
}

function ensureRequiredAuthEnv() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET nao configurado.");
  }
}

async function bootstrap() {
  try {
    ensureDatabaseUrl();
    ensureRequiredAuthEnv();

    const [{ default: app }, { prismaClient }] = await Promise.all([
      import("./app"),
      import("../infrastructure/database/prisma/client")
    ]);

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
