import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class CreateUsuarioSoftskillDto {
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
  id_softskill: number;
}
