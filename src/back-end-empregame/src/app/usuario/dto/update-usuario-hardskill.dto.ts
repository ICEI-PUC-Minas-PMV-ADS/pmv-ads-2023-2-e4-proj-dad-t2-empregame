import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioHardskillDto } from './create-usuario-hardskill.dto';

export class UpdateUsuarioHardskillDto extends PartialType(
  CreateUsuarioHardskillDto,
) {}
