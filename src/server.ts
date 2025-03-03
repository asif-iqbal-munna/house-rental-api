import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
import seedAdmin from './app/DB/seed';

let server: Server | null = null;

async function connectToDatabase() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }
}

// Graceful shutdown
function gracefulShutdown(signal: string) {
  console.log(`Received ${signal}. Closing server...`);
  if (server) {
    server.close(() => {
      console.log('Server closed gracefully');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

async function main() {
  try {
    await connectToDatabase();
    await seedAdmin();

    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });

    // Listen for termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Error handling
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      gracefulShutdown('uncaughtException');
    });

    process.on('unhandledRejection', (error) => {
      console.error('Unhandled Rejection:', error);
      gracefulShutdown('unhandledRejection');
    });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
