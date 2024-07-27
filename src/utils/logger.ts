import winston from 'winston';

const formats = [
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`),
    winston.format.colorize({
      all: true,
      colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'white',
      },
    }),
];

  export const Logger = winston.createLogger({
    level: 'http',
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
    },
    format: winston.format.combine(...formats),
    transports: [new winston.transports.Console()],
});