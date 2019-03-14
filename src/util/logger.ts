import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

let t = require('winston-daily-rotate-file');
 
  var transport = new (t)({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });
 
  transport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
  });
 
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp}[${level}]- ${message}`;
});
 
const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
      transport,
      new transports.Console(),
  ]
});

 
export default logger;