import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMensagemDto {
  @ApiProperty()
  @IsString()
  conteudo: string;

  @ApiProperty()
  @IsNumber()
  id_usuario: number;

  @ApiProperty()
  @IsNumber()
  id_vaga_candidato: number;
}
