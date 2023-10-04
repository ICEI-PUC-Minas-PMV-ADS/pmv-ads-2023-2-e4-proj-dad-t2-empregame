import { ApiProperty } from '@nestjs/swagger';
import { UsuarioHardskill as UsuarioHardSkillModel } from '@prisma/client';

export class UsuarioHardSkill implements UsuarioHardSkillModel {
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
  id_hardskill: number;
}
