import type { Config } from '@jest/types';

// ref: https://jestjs.io/docs/configuration
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "identity-obj-proxy"
  }
};

export default config;
