import { CorsOptions } from 'cors';

const whitelist: string[] = [
  'http://localhost:5173'
];

export const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bị block bởi policy CORS!'));
    }
  },
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'x-idempotency-key'],
  exposedHeaders: ['x-rate-limit-remaining', 'x-new-token'],
  credentials: true
};