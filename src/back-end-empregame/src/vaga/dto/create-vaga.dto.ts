import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum VagaSituacao {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

export class CreateVagaDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  descricao: string;

  @ApiProperty()
  @IsString()
  salario: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  beneficios?: string;

  @ApiProperty()
  @IsString()
  empresa_nome: string;

  @ApiProperty()
  @IsString()
  empresa_cidade: string;

  @ApiProperty()
  @IsString()
  empresa_estado: string;

  @ApiProperty({ enum: VagaSituacao })
  @IsString()
  @IsEnum(VagaSituacao)
  situacao: VagaSituacao;

  @ApiProperty()
  @IsNumber()
  id_usuario: number;
}
