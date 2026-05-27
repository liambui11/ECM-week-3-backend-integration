import NodeCache from 'node-cache';
import { CachedResponse, IIdempotencyStore } from '../interfaces/idempotency-store.interface';

export class NodeCacheStore implements IIdempotencyStore {
  private readonly cache: NodeCache;

  constructor(ttlSeconds: number) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: Math.floor(ttlSeconds * 0.2),
      useClones: false,
    });
  }

  async get(key: string): Promise<CachedResponse | null> {
    return this.cache.get<CachedResponse>(key) ?? null;
  }

  async set(key: string, value: CachedResponse, ttl: number): Promise<void> {
    this.cache.set(key, value, ttl);
  }

  async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }
}