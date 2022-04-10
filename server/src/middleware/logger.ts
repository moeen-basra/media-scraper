import { NextFunction, Request, Response } from "express";
import morgan, { StreamOptions } from "morgan";
import Logger from "../config/logger";

const stream: StreamOptions = {
  // Use the http severity
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  ":method :url :status Request body:req[Content-Length] :res[content-length] - :response-time ms",
  { stream, skip }
);

export default morganMiddleware;

export const logger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(JSON.stringify(request.body));

  next();
};
