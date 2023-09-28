import { Module } from '@nestjs/common';
import { VagaService } from './vaga.service';
import { VagaController } from './vaga.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VagaController],
  providers: [VagaService],
  imports: [PrismaModule],
})
export class VagaModule {}
