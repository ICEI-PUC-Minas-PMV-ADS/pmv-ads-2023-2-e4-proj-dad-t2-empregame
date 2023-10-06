import { IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVagaHardskillDto {
  @ApiProperty()
  @IsNumber()
  id_vaga: number;

  @ApiProperty()
  @IsNumber()
  id_hardskill: number;
}
