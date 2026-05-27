import { CachedResponse, IIdempotencyStore } from '../interfaces/idempotency-store.interface';
import { IKeyHasher } from '../interfaces/key-hasher.interface';

export class IdempotencyService {
  constructor(
    private readonly store: IIdempotencyStore,
    private readonly hasher: IKeyHasher,
    private readonly ttl: number,
  ) {}

  buildKey(rawKey: string, userId?: string): string {
    return this.hasher.hash(rawKey, userId);
  }

  async getCached(hashedKey: string): Promise<CachedResponse | null> {
    return this.store.get(hashedKey);
  }

  async saveResponse(hashedKey: string, statusCode: number, body: unknown): Promise<void> {
    if (statusCode >= 200 && statusCode < 300) {
      await this.store.set(hashedKey, { statusCode, body }, this.ttl);
    }
  }
}