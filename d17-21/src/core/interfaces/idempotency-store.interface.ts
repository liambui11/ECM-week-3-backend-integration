export interface CachedResponse {
  statusCode: number;
  body: unknown;
}

export interface IIdempotencyStore {
  get(key: string): Promise<CachedResponse | null>;
  set(key: string, value: CachedResponse, ttl: number): Promise<void>;
  has(key: string): Promise<boolean>;
}