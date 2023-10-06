import { ApiProperty } from '@nestjs/swagger';
import { Hardskill as HardskillModel } from '@prisma/client';

export class Hardskill implements HardskillModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  nome: string;
}
