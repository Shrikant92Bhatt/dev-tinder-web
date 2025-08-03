// Environment configuration
const environments = {
  development: {
    API_BASE_URL: '', // Use relative URLs in development (proxy handles it)
    APP_NAME: 'DevTinder',
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    BUILD_TIME: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
    DEBUG: true,
    LOG_LEVEL: 'debug'
  },
  staging: {
    API_BASE_URL: 'https://staging-api.your-domain.com',
    APP_NAME: 'DevTinder',
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    BUILD_TIME: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
    DEBUG: false,
    LOG_LEVEL: 'info'
  },
  production: {
    API_BASE_URL: 'https://api.your-domain.com',
    APP_NAME: 'DevTinder',
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    BUILD_TIME: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
    DEBUG: false,
    LOG_LEVEL: 'error'
  }
};

// Get current environment
const currentEnv = import.meta.env.MODE || 'development';

// Export configuration for current environment
export const config = environments[currentEnv] || environments.development;

// Export environment helpers
export const isDevelopment = currentEnv === 'development';
export const isStaging = currentEnv === 'staging';
export const isProduction = currentEnv === 'production';

// API configuration
export const API_CONFIG = {
  baseURL: config.API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-App-Version': config.APP_VERSION
  }
};

// Feature flags
export const FEATURES = {
  ANALYTICS: isProduction,
  DEBUG_MODE: config.DEBUG,
  SERVICE_WORKER: isProduction,
  PWA: isProduction
};

// Logging configuration
export const LOG_CONFIG = {
  level: config.LOG_LEVEL,
  enabled: config.DEBUG
}; 