import { env } from './src/config/env.js';
import app from './src/app.js';

const startServer = async () => {
  try {
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