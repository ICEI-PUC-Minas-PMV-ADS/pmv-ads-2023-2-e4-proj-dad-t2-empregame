import { ApiProperty } from '@nestjs/swagger';
import { VagaSoftskill as VagaSoftSkillModel } from '@prisma/client';

export class VagaSoftSkill implements VagaSoftSkillModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  id_vaga: number;

  @ApiProperty()
  id_softskill: number;
}
