import { envSchema } from './env.schema';
import { treeifyError } from 'zod';

export const validateEnv = (config: Record<string, unknown>) => {
  const parsed = envSchema.safeParse(config);

  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      JSON.stringify(treeifyError(parsed.error), null, 2),
    );
    throw new Error('Invalid environment variables.');
  }

  return parsed.data;
};
