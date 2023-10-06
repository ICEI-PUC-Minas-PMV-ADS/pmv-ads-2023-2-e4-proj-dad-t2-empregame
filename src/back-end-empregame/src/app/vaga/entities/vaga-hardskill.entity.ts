import { ApiProperty } from '@nestjs/swagger';
import { VagaHardskill as VagaHardSkillModel } from '@prisma/client';

export class VagaHardSkill implements VagaHardSkillModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  id_vaga: number;

  @ApiProperty()
  id_hardskill: number;
}
