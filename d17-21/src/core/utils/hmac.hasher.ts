import crypto from 'crypto';
import { IKeyHasher } from '../interfaces/key-hasher.interface';

export class HmacHasher implements IKeyHasher {
  private readonly secret: string;

  constructor(secret: string) {
    if (!secret) throw new Error('HmacHasher: IDEMPOTENCY_SECRET is required');
    this.secret = secret;
  }

  hash(rawKey: string, userId: string = 'anonymous'): string {
    return crypto
      .createHmac('sha256', this.secret)
      .update(`${userId}:${rawKey}`)
      .digest('hex');
  }
}