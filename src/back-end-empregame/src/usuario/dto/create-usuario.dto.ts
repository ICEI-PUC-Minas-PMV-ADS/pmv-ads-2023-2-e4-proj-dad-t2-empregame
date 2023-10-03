import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum UsuarioTipo {
  RECRUTADOR = 'RECRUTADOR',
  CANDIDATO = 'CANDIDATO',
}

export class CreateUsuarioDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty({ enum: UsuarioTipo })
  @IsString()
  @IsEnum(UsuarioTipo)
  tipo: UsuarioTipo;

  @ApiProperty()
  @IsString()
  senha: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  telefone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  linkedin?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  github?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  portfolio?: string;
}
