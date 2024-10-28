import winston from "winston";
import path from "path";
import fs from "fs";

export class Logger {
  private logDirectory: string;
  private logger: winston.Logger;

  constructor(logDirectory: string) {
    this.logDirectory = logDirectory;
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory);
    }

    const logFilename = path.join(this.logDirectory, "output.log");
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({ filename: logFilename, level: "debug" }),
      ],
    });
  }

  public clearLogs = (): void => {
    if (fs.existsSync(this.logDirectory)) {
      fs.readdirSync(this.logDirectory).forEach((file) => {
        fs.unlinkSync(path.join(this.logDirectory, file));
      });
    }
  };

  public getLogger = (): winston.Logger => {
    return this.logger;
  };

  public info = (message: string): void => {
    this.logger.info(message);
  };

  public warn = (message: string): void => {
    this.logger.warn(message);
  };

  public error = (message: string): void => {
    this.logger.error(message);
  };

  public debug = (message: string): void => {
    this.logger.debug(message);
  };
}
