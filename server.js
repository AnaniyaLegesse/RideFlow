import ws from 'ws';

// Temporary test: can Railway connect to Neon via WebSocket?
const testWs = new ws('wss://ep-plain-bar-al5anhfp.c-3.eu-central-1.aws.neon.tech/ws');
testWs.on('open', () => {
  console.log('✅ WebSocket test to Neon succeeded');
  testWs.close();
});
testWs.on('error', (e) => {
  console.error('❌ WebSocket test to Neon failed:', e.message);
  testWs.close();
});
// End temporary test





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