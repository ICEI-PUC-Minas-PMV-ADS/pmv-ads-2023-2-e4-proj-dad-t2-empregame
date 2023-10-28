import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HardskillService } from './hardskill.service';
import { CreateHardskillDto } from './dto/create-hardskill.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Hardskill } from './entities/hardskill.entity';
import { Public } from 'src/utils/decorators/is-public.decorator';

@Controller('hardskills')
@ApiTags('hardskills')
@Public()
export class HardskillController {
  constructor(private readonly hardskillService: HardskillService) {}

  @Post()
  async create(@Body() data: CreateHardskillDto) {
    const hardskill = await this.hardskillService.create(data);
    return hardskill;
  }

  @Get()
  @ApiOkResponse({ type: Hardskill, isArray: true })
  async findAll() {
    const hardskills = await this.hardskillService.findAll();
    return hardskills;
  }

  @Get(':id')
  @ApiOkResponse({ type: Hardskill })
  async findOne(@Param('id') id: string) {
    const hardskill = await this.hardskillService.findOne(+id);
    return hardskill;
  }
}
