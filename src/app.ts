import express, { type Request, type Response } from 'express';

export const app = express();

export function sum(a: number, b: number) {
  const sum = a + b;
  return sum;
}

app.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to API v1.0.0',
    timestamp: new Date().toISOString(),
  });
});
