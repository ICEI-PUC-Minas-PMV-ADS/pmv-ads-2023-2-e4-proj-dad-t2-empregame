import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { VagaModule } from './vaga/vaga.module';
import { HardskillModule } from './hardskill/hardskill.module';
import { SoftskillModule } from './softskill/softskill.module';

@Module({
  imports: [PrismaModule, UsuarioModule, AuthModule, VagaModule, HardskillModule, SoftskillModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
