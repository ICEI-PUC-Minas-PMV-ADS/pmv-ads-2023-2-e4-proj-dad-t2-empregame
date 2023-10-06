import { PartialType } from '@nestjs/swagger';
import { CreateHardskillDto } from './create-hardskill.dto';

export class UpdateHardskillDto extends PartialType(CreateHardskillDto) {}
