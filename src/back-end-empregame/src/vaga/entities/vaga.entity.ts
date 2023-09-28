import { ApiProperty } from '@nestjs/swagger';

export class Vaga {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ nullable: true })
  disabled_at: Date | null;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  salario: string;

  @ApiProperty({ nullable: true })
  beneficios: string | null;

  @ApiProperty()
  empresa_nome: string;

  @ApiProperty()
  empresa_cidade: string;

  @ApiProperty()
  empresa_estado: string;

  @ApiProperty()
  situacao: string;
}
