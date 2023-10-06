import { PartialType } from '@nestjs/swagger';
import { CreateVagaSoftskillDto } from './create-vaga-softskill.dto';

export class UpdateVagaSoftskillDto extends PartialType(
  CreateVagaSoftskillDto,
) {}
