import winston from "winston";

function getFormat(label: string) {
  return winston.format.combine(
    winston.format.label({ label: label }),
    winston.format.timestamp(),
    winston.format.printf(info => {
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    })
  );
}

export const GENERAL_LOGGER = winston.createLogger({
  level: "info",
  format: getFormat("General"),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "general.log" })
  ]
});

export const SQL_LOGGER = winston.createLogger({
  level: "info",
  format: getFormat("Sequelize"),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "sql.log" })
  ]
});

export const ERROR_LOGGER = winston.createLogger({
  level: "error",
  format: getFormat("Error"),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log" })
  ]
});

export const EXCEPTION_LOGGER = winston.createLogger({
  level: "error",
  format: getFormat("Exception"),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "exceptions.log" })
  ]
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
