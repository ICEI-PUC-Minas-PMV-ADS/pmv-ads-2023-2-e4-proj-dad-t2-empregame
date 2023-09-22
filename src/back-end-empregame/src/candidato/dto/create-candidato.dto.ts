import { ApiProperty } from '@nestjs/swagger';

export class CreateCandidatoDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;
}
