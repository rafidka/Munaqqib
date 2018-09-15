import dotenv from "dotenv";
import sourceMapSupport from "source-map-support";

if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV environment variable is not set.");
}

console.log("NODE_ENV=" + process.env.NODE_ENV);

/**
 * Loads the .env file corresponding to the environment the program is currently
 * running as, e.g. ".env.development", etc.
 */
function loadDotEnvFile() {
  switch (process.env.NODE_ENV) {
    case "production":
      dotenv.config({path: ".env.production"});
      break;

    case "development":
      dotenv.config({path: ".env.development"});
      break;

    case "test":
      dotenv.config({path: ".env.test"});
      break;

    default:
      throw new Error("Invalid environment.");
  }
}

/**
 * Install source map support so errors happening while executing bundle.js
 * can be mapped to actual source code
 */
function installSourceMapSupport() {
  sourceMapSupport.install();
}

export function setup() {
  loadDotEnvFile();
  installSourceMapSupport();
}
