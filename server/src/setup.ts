import dotenv from "dotenv";
import sourceMapSupport from "source-map-support";
// Import logging to initialize loggers.
import { EXCEPTION_LOGGER } from "./logging";

if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV environment variable is not set.");
}

console.log("NODE_ENV=" + process.env.NODE_ENV);

/**
 * Loads the .env file corresponding to the environment the program is currently
 * running as, e.g. ".env.development", etc.
 */
function loadDotEnvFile() {
  const env = process.env.NODE_ENV;
  console.info(`Environment is: ${env}.`);
  switch (process.env.NODE_ENV) {
    case "production":
      dotenv.config({ path: "./.env/production.env" });
      break;

    case "development":
      dotenv.config({ path: "./.env/development.env" });
      break;

    case "test":
      dotenv.config({ path: "./.env/test.env" });
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

/**
 * Executes common functionality required by both the server and daemon.
 */
export function setup() {
  loadDotEnvFile();
  installSourceMapSupport();
}

type StartFunc = () => void;
type AsyncStartFunc = () => Promise<void>;

/**
 * Starts the given function and add the necessary exception handling to ensure
 * that unhandled exceptions are logged. This is similar to {@link startAsync}
 * except that the passed function should not by asynchronous.
 *
 * @param func The function to be executed.
 */
export function start(func: StartFunc) {
  try {
    func();
  } catch (ex) {
    EXCEPTION_LOGGER.log("error", ex);
    console.error("An exception was not caught causing the process to end.");
    process.exit(1);
  }
}

/**
 * Starts the given function and add the necessary exception handling to ensure
 * that unhandled exceptions are logged. This is similar to {@link start}
 * except that the passed function should be async, i.e. return a promise.
 *
 * @param func The function to be executed.
 */
export function startAsync(func: AsyncStartFunc) {
  func().catch(ex => {
    EXCEPTION_LOGGER.log("error", ex);
    // Cannot use loggers anymore, so use console.error().
    console.error("An exception was not caught causing the process to end.");
    process.exit(1);
  });
}
