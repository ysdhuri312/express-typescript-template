import { app } from './app.ts';
import { env } from './configs/env.ts';

const server = app.listen(env.PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});

let isShuttingDown = false;
const shutdown = (signal: string, exitCode: number) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  console.log(`${signal} received. Shutting down gracefully.`);

  server.close((error) => {
    if (error) {
      console.error('Failed to close HTTP server:', error);
    }

    try {
      // await disconnectDB();
    } catch (error) {
      console.error('Failed to disconnect database:', error);
    }

    process.exit(exitCode); // (1)Process terminated because of an error.(0)successful shutdown.
  });
};

// handle promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  shutdown('unhandledRejection', 1);
});

// handled synchronous/runtime exception
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  shutdown('uncaughtException', 1);
});

// External system (os, docker, etc.) asks your application to stop.
process.on('SIGTERM', () => {
  shutdown('SIGTERM', 0);
});

// SIGINT received (Ctrl+C), Gracefully shutdown.
process.on('SIGINT', () => {
  shutdown('SIGINT', 0);
});
