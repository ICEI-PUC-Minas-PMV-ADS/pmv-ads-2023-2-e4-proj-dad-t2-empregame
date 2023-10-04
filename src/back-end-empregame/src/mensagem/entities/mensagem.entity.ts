import { ApiProperty } from '@nestjs/swagger';
import { Mensagem as MensagemModel } from '@prisma/client';

export class Mensagem implements MensagemModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  conteudo: string;

  @ApiProperty()
  id_usuario: number;

  @ApiProperty()
  id_vaga_candidato: number;
}
