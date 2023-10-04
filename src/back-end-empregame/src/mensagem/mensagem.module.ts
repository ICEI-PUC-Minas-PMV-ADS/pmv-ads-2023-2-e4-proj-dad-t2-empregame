import { Module } from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { MensagemController } from './mensagem.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MensagemController],
  providers: [MensagemService],
  imports: [PrismaModule],
})
export class MensagemModule {}
