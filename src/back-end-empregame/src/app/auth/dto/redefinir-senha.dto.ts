import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class AuthRedefinirSenhaDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @ValidateIf((etapa) => etapa.senha)
  @IsNotEmpty()
  codigo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @ValidateIf((etapa) => etapa.codigo)
  @IsNotEmpty()
  senha?: string;
}
