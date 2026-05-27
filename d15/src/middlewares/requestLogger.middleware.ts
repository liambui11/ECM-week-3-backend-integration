import { Request, Response, NextFunction } from 'express';
import { LOG_PREFIX } from '../constants/app.constants';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    console.log(
      `${LOG_PREFIX} ${method} ${originalUrl} → ${statusCode} (${duration}ms)`
    );
  });

  next();
};
