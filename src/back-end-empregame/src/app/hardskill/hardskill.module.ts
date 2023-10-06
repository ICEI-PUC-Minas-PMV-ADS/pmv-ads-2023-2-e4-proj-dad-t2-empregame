import { Module } from '@nestjs/common';
import { HardskillService } from './hardskill.service';
import { HardskillController } from './hardskill.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [HardskillController],
  providers: [HardskillService],
  imports: [PrismaModule],
})
export class HardskillModule {}
