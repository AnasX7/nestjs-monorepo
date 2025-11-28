import * as dotenv from 'dotenv';
import { betterAuth } from 'better-auth';
import { admin, openAPI } from 'better-auth/plugins';
// import { expo } from '@better-auth/expo';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@repo/db';

dotenv.config({
  path: '../../../apps/server/.env',
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || '', 'myapp://', 'exp://'],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
  plugins: [admin(), openAPI()],
});
