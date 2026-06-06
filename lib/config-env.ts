import { SaasConfig } from '@/types';
import { saasConfig as baseConfig } from '../saas.config';

// Development overrides
const developmentConfig: Partial<SaasConfig> = {
  app: {
    ...baseConfig.app,
    url: 'http://localhost:3000',
  },
  billing: {
    ...baseConfig.billing,
    trialDays: 30, // Longer trial in development
  },
};

// Production overrides
const productionConfig: Partial<SaasConfig> = {
  app: {
    ...baseConfig.app,
    url: process.env.NEXTAUTH_URL || baseConfig.app.url,
  },
};

// Merge configurations based on environment
export function getConfig(): SaasConfig {
  const env = process.env.NODE_ENV;
  
  switch (env) {
    case 'development':
      return { ...baseConfig, ...developmentConfig };
    case 'production':
      return { ...baseConfig, ...productionConfig };
    default:
      return baseConfig;
  }
}

export const saasConfig = getConfig();
