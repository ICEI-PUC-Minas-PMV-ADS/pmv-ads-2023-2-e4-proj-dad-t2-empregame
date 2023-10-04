import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioSoftskillDto } from './create-usuario-softskill.dto';

export class UpdateUsuarioSoftskillDto extends PartialType(
  CreateUsuarioSoftskillDto,
) {}
