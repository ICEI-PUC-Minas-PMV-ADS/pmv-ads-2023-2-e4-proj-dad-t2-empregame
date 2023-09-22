import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CandidatoModule } from './candidato/candidato.module';

@Module({
  imports: [PrismaModule, CandidatoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
