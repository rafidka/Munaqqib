module.exports = {
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/server/public/**/*.ts",
    "!src/database.ts",
    "!src/setup.ts"
  ],
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  setupFiles: [
    "./test/setup.ts"
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '**/test/**/*.test.(ts|js)'
  ],
  testEnvironment: 'node'
};
