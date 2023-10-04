import { IsNumber, Min } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Max } from 'class-validator';

export class CreateUsuarioHardskillDto {
  @ApiProperty({ minimum: 1, maximum: 5 })
  @Min(1)
  @Max(5)
  @IsNumber()
  nivel_experiencia: number;

  @ApiProperty()
  @IsNumber()
  id_usuario: number;

  @ApiProperty()
  @IsNumber()
  id_hardskill: number;
}
