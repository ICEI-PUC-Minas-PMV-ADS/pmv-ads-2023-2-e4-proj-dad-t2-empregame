import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './contants';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { APP_GUARD } from '@nestjs/core';
import { RedisGuard } from './auth.guard';

import { BcryptService } from '../../utils/providers/bcrypt/bcrypt.service';
import { EmailsService } from '../../utils/providers/mail/email.service';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    EmailsService,
    BcryptService,
    AuthService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RedisGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
