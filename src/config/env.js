import dotenv from 'dotenv';

dotenv.config();

const requiredVars = ['NODE_ENV', 'PORT'];

for (const key of requiredVars) {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  appName: process.env.APP_NAME || 'CarRentalBackend',
};