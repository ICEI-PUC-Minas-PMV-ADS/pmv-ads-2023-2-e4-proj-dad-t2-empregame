import { ApiProperty } from '@nestjs/swagger';
import { UsuarioSoftskill as UsuarioSoftSkillModel } from '@prisma/client';

export class UsuarioSoftSkill implements UsuarioSoftSkillModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  nivel_experiencia: number;

  @ApiProperty()
  id_usuario: number;

  @ApiProperty()
  id_softskill: number;
}
