import { env } from './src/config/env.js';
import app from './src/app.js';
import prisma from './src/db/postgres.js';
import connectMongo from './src/db/mongo.js';

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectMongo();

    // Test PostgreSQL connection
    await prisma.$connect();
    console.log('✅ PostgreSQL connected via Prisma');

    // Start the HTTP server only after both databases are ready
    app.listen(env.port, () => {
      console.log(`✅ ${env.appName} is running`);
      console.log(`🌍 Environment: ${env.nodeEnv}`);
      console.log(`🚀 Server: http://localhost:${env.port}`);
      console.log(`❤️  Health check: http://localhost:${env.port}/api/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();