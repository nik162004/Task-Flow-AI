export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code = "APP_ERROR",
    public details?: unknown
  ) {
    super(message);
  }
}

export const unauthorized = () => new AppError(401, "Authentication required", "UNAUTHORIZED");
export const forbidden = () => new AppError(403, "You do not have access to this resource", "FORBIDDEN");
export const notFound = (resource = "Resource") => new AppError(404, `${resource} not found`, "NOT_FOUND");
