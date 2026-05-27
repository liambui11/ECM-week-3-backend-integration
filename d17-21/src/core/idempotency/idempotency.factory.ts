import { IDEMPOTENCY_CONFIG } from '../../config/constants';
import { NodeCacheStore } from '../cache/node-cache.store';
import { HmacHasher } from '../utils/hmac.hasher';
import { IdempotencyService } from './idempotency.service';
import { createIdempotencyMiddleware } from './idempotency.middleware';
import { RequestHandler } from 'express';

export const buildIdempotencyMiddleware = (): RequestHandler => {
  const store = new NodeCacheStore(IDEMPOTENCY_CONFIG.ttl);
  const hasher = new HmacHasher(IDEMPOTENCY_CONFIG.secret);
  const service = new IdempotencyService(store, hasher, IDEMPOTENCY_CONFIG.ttl);
  return createIdempotencyMiddleware(service);
};