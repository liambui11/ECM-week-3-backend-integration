import { buildIdempotencyMiddleware } from './idempotency.factory';

export const idempotency = buildIdempotencyMiddleware();