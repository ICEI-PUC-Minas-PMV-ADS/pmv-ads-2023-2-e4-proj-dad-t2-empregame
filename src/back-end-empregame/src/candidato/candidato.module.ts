import { Module } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CandidatoController } from './candidato.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CandidatoController],
  providers: [CandidatoService],
  imports: [PrismaModule],
})
export class CandidatoModule {}
