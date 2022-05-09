import type { Config } from '@jest/types';

// ref: https://jestjs.io/docs/configuration
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  moduleNameMapper:{
    "*.txt$": "$1"
  }
};

export default config;
