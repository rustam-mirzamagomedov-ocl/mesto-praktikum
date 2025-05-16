import expressWinston from "express-winston";
import path from "path";
import winston from "winston";

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs", "request.log"),
    }),
  ],
  headerBlacklist: ["cookie", "authorization"],
  bodyBlacklist: ["token"],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs", "error.log"),
    }),
  ],
  headerBlacklist: ["cookie", "authorization"],
  format: winston.format.json(),
});
