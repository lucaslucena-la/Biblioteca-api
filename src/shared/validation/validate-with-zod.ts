import { z } from "zod";

import { AppError } from "../errors/app-error";

export function validateWithSchema<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  payload: unknown
): z.infer<TSchema> {
  const result = schema.safeParse(payload);

  if (!result.success) {
    throw new AppError({
      message: "Dados de entrada invalidos",
      code: "VALIDATION_ERROR",
      statusCode: 400,
      details: result.error.flatten()
    });
  }

  return result.data;
}
