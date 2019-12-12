import { RequestHandler } from "express-serve-static-core";
import morgan = require("morgan");

export type LoggingOptions = {
  format: string
  options: morgan.Options
}

export const useLogging: (options: LoggingOptions) => RequestHandler = options => {

  return morgan(options.format, options.options)
}
