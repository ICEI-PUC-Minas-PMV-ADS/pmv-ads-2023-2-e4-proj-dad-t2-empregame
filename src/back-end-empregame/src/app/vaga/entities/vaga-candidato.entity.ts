import { ApiProperty } from '@nestjs/swagger';
import { VagaCandidato as VagaCandidatoModel } from '@prisma/client';

export class VagaCandidato implements VagaCandidatoModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  match: boolean;

  @ApiProperty()
  id_usuario: number;

  @ApiProperty()
  id_vaga: number;
}
