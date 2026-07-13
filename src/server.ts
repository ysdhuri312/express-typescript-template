import { app } from './app';

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server runnning on PORT ${port}`);
});

let isShuttingDown = false;
const shutdown = (signal: string, exitCode: number) => {
  if (isShuttingDown) return;

  isShuttingDown = true;

  console.log(`${signal} received. Shutting down gracefully.`);

  server.close(async (error) => {
    if (error) {
      console.error('Failed to close HTTP server:', error);
    }

    try {
      //   await disconnectDB();
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
