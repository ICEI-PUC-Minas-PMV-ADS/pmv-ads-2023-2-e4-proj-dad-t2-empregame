import { PartialType } from '@nestjs/swagger';
import { CreateSoftskillDto } from './create-softskill.dto';

export class UpdateSoftskillDto extends PartialType(CreateSoftskillDto) {}
