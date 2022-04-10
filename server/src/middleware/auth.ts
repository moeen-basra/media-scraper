import { NextFunction, Request, Response } from "express";
import baseAuth from 'basic-auth'

export const auth = (request: Request, response: Response, next: NextFunction) => {
  const user = baseAuth(request);

  if (user?.name === 'moeen' && user?.pass === 'basra') {
    next();
  } else {
    response.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    response.sendStatus(401);
  }
}
