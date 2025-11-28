import { Injectable } from '@nestjs/common';
import { PrismaClient, adapter } from '@repo/db';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({ adapter });
  }
}
