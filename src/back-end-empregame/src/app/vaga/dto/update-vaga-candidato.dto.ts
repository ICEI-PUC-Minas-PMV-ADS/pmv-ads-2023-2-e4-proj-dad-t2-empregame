import { PartialType } from '@nestjs/swagger';
import { CreateVagaCandidatoDto } from './create-vaga-candidato.dto';

export class UpdateVagaCandidatoDto extends PartialType(
  CreateVagaCandidatoDto,
) {}
