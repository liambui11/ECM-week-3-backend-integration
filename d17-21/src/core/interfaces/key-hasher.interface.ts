export interface IKeyHasher {
  hash(rawKey: string, userId?: string): string;
}