export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(params: { message: string; statusCode?: number; code?: string; details?: unknown }) {
    super(params.message);
    this.name = "AppError";
    this.statusCode = params.statusCode ?? 400;
    this.code = params.code ?? "APP_ERROR";
    this.details = params.details;
  }
}
