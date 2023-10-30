import { ApiProperty } from '@nestjs/swagger';
import { Usuario as UsuarioModel } from '@prisma/client';

export class Usuario implements UsuarioModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  tipo: string;

  @ApiProperty()
  senha: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ nullable: true })
  telefone: string | null;

  @ApiProperty({ nullable: true })
  linkedin: string | null;

  @ApiProperty({ nullable: true })
  github: string | null;

  @ApiProperty({ nullable: true })
  portfolio: string | null;

  @ApiProperty()
  situacao: string;
}
