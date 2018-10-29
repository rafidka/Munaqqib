module.exports = {
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/database.ts",
    "!src/exceptions.ts",
    "!src/logging.ts",
    "!src/server.ts",
    "!src/setup.ts"
  ],
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json"
    }
  },
  moduleFileExtensions: ["ts", "js"],
  setupFiles: ["./test/setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["**/test/**/*.test.(ts|js)"],
  testEnvironment: "node"
};
