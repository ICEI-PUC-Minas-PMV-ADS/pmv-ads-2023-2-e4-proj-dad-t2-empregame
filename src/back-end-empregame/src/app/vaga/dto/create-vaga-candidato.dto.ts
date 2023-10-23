import { ApiProperty } from '@nestjs/swagger';

export class CreateVagaCandidatoDto {
  @ApiProperty()
  match: boolean;

  @ApiProperty()
  id_usuario: number;

  @ApiProperty()
  id_vaga: number;
}
