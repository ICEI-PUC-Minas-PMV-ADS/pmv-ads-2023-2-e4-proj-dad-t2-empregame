import { ApiProperty } from '@nestjs/swagger';
import { Softskill as SoftskillModel } from '@prisma/client';

export class Softskill implements SoftskillModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  nome: string;
}
