import { Request, Response, NextFunction, RequestHandler } from 'express';
import { IdempotencyService } from './idempotency.service';

const IDEMPOTENCY_HEADER = 'x-idempotency-key';
const IDEMPOTENCY_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export const createIdempotencyMiddleware = (
  service: IdempotencyService
): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!IDEMPOTENCY_METHODS.has(req.method)) {
      next();
      return;
    }

    const rawKey = req.headers[IDEMPOTENCY_HEADER] as string | undefined;
    if (!rawKey) {
      res.status(400).json({
        success: false,
        message: `Missing '${IDEMPOTENCY_HEADER}' header`,
      });
      return;
    }

    try {
      const userId = (req as any).user?.id as string | undefined;
      const hashedKey = service.buildKey(rawKey, userId);
      console.log('raw key    :', rawKey);
      console.log('hashed key :', hashedKey);

      const cached = await service.getCached(hashedKey);
      if (cached) {
        res.status(cached.statusCode).json(cached.body);
        return;
      }

      const originalJson = res.json.bind(res);
      res.json = (body: unknown) => {
        service
          .saveResponse(hashedKey, res.statusCode, body)
          .catch(console.error);
        return originalJson(body);
      };

      next();
    } catch (err) {
      next(err);
    }
  };
};
