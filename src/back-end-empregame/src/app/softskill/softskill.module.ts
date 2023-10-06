import { Module } from '@nestjs/common';
import { SoftskillService } from './softskill.service';
import { SoftskillController } from './softskill.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SoftskillController],
  providers: [SoftskillService],
  imports: [PrismaModule],
})
export class SoftskillModule {}
