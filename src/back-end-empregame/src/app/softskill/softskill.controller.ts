import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SoftskillService } from './softskill.service';
import { CreateSoftskillDto } from './dto/create-softskill.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Softskill } from './entities/softskill.entity';
import { Public } from 'src/utils/decorators/is-public.decorator';

@Controller('softskills')
@ApiTags('softskills')
@Public()
export class SoftskillController {
  constructor(private readonly softskillService: SoftskillService) {}

  @Post()
  async create(@Body() data: CreateSoftskillDto) {
    const hardskill = await this.softskillService.create(data);
    return hardskill;
  }

  @Get()
  @ApiOkResponse({ type: Softskill, isArray: true })
  async findAll() {
    const softskills = await this.softskillService.findAll();
    return softskills;
  }

  @Get(':id')
  @ApiOkResponse({ type: Softskill })
  async findOne(@Param('id') id: string) {
    const vaga = await this.softskillService.findOne(+id);
    return vaga;
  }
}
