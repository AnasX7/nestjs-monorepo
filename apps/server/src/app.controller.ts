import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvService } from './config/env.service';
import { PrismaService } from './db/prisma.service';
import { AllowAnonymous, AuthService } from '@thallesp/nestjs-better-auth';
import { auth } from '@repo/auth';

@AllowAnonymous()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly env: EnvService,
    private prisma: PrismaService,
    private authService: AuthService<typeof auth>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('post')
  async postHello() {
    let user;
    try {
      user = await this.authService.api.createUser({
        body: {
          name: 'test',
          email: 'test@example.com',
          password: 'password',
        },
      });
    } catch (error) {
      user = {
        name: 'test',
        message: error.message,
        error,
      };
    }
    return this.appService.postHello(user);
  }
}
