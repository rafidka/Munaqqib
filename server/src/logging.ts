import winston from "winston";
import Transport from "winston-transport";

// Full URL of the 'views' directory.
const LOGS_DIR = process.env.LOGS_DIR;
const IS_TEST_MODE = process.env.NODE_ENV === "test";

function getFormat(label: string) {
  return winston.format.combine(
    winston.format.label({ label: label }),
    winston.format.timestamp(),
    winston.format.printf(info => {
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    })
  );
}

function getTransports(filename: string): Transport[] {
  if (IS_TEST_MODE) {
    // Don't log to files in test mode.
    return [new winston.transports.Console()];
  } else {
    return [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: filename,
        dirname: LOGS_DIR
      })
    ];
  }
}

export const GENERAL_LOGGER = winston.createLogger({
  level: "info",
  format: getFormat("General"),
  transports: getTransports("general.log")
});

export const SQL_LOGGER = winston.createLogger({
  level: "info",
  format: getFormat("Sequelize"),
  transports: getTransports("sql.log")
});

export const ERROR_LOGGER = winston.createLogger({
  level: "error",
  format: getFormat("Error"),
  transports: getTransports("error.log")
});

export const EXCEPTION_LOGGER = winston.createLogger({
  level: "error",
  format: getFormat("Exception"),
  transports: getTransports("exceptions.log")
});

export function endLoggers() {
  GENERAL_LOGGER.end();
  SQL_LOGGER.end();
  ERROR_LOGGER.end();
  EXCEPTION_LOGGER.end();
}

process.on("exit", () => {
  console.log("on(exit) was called.");
  endLoggers();
});
