import { PartialType } from '@nestjs/swagger';
import { CreateVagaHardskillDto } from './create-vaga-hardskill.dto';

export class UpdateVagaHardskillDto extends PartialType(
  CreateVagaHardskillDto,
) {}
