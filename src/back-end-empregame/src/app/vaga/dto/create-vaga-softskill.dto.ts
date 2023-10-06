import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateVagaSoftskillDto {
  @ApiProperty()
  @IsNumber()
  id_vaga: number;

  @ApiProperty()
  @IsNumber()
  id_softskill: number;
}
