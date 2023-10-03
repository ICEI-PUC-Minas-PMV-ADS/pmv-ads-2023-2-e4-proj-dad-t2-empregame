import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { VagaModule } from './vaga/vaga.module';
import { HardskillModule } from './hardskill/hardskill.module';
import { SoftskillModule } from './softskill/softskill.module';
import { APP_GUARD } from '@nestjs/core';
import { RedisGuard } from './auth/auth.guard';

@Module({
  imports: [
    PrismaModule,
    UsuarioModule,
    AuthModule,
    VagaModule,
    HardskillModule,
    SoftskillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
