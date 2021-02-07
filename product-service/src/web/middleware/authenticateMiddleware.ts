import { NextFunction, Request, Response } from 'express';

export default function authenticateMiddleware(req: Request, res: Response, next: NextFunction) {
  const userName = req.header('x-user');

  if (!userName) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  req.locals = {
    ...req.locals,
    user: userName,
  };
  next();
}
