import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  REDIS_HOST: z.string().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().default(6379),
  OUTBOUND_WEBHOOK_URL: z.string().url().default('https://example.com/webhooks/member-events'),
  OUTBOUND_WEBHOOK_SECRET: z.string().min(8).default('dev_outbound_webhook_secret_123'),
  ISSUER_WEBHOOK_SECRET: z.string().min(8).default('dev_issuer_webhook_secret_123'),
});

export const env = envSchema.parse(process.env);
