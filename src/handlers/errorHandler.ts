import type { Response, Request, NextFunction } from 'express';
import { env } from '../configs/env.ts';
import type { AppError } from './GlobalErrorHandler.ts';

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    timestamp: new Date().toISOString(),
    details: env.NODE_ENV === 'development' ? err.stack : null,
  });
}
