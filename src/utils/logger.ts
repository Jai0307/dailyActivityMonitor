import winston from "winston";
import "winston-daily-rotate-file";
import moment from "moment-timezone";
import path from "path";

export function getFormattedDate() {
  var d = new Date();
  const dstr =
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2) +
    "_" +
    ("0" + d.getHours()).slice(-2) +
    "-" +
    ("0" + d.getMinutes()).slice(-2) +
    "-" +
    ("0" + d.getSeconds()).slice(-2);

  if (process.env.NODE_ENV === "production") {
    return dstr;
  } else {
    return "develop";
  }
}

const appendTimestamp = winston.format((info, opts) => {
  if (opts.tz) info.timestamp = moment().tz(opts.tz).format();
  return info;
});

// const dtstr = getFormattedDate();
// console.log(dtstr);

var transport = new winston.transports.DailyRotateFile({
  filename: "./log/application-%DATE%.log",
  datePattern: "YYYY-MM-DD", //datePattern: "YYYY-MM-DD-HH",
  zippedArchive: false,
  // maxSize: "20m",
  // maxFiles: "14d",
});

transport.on("rotate", function (oldFilename: string, newFilename: string) {
  // do something fun
  logger.log("info", "rotate: " + oldFilename + ", " + newFilename);
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.splat(),
    // winston.format.timestamp(),
    appendTimestamp({ tz: "America/Chicago" }),
    winston.format.printf((info) => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    transport,
    // new winston.transports.File({
    //   filename: `./log/app${getFormattedDate()}.log`,
    // }),
  ],
});

// logger.add(new winston.transports.Console());

export default logger;
