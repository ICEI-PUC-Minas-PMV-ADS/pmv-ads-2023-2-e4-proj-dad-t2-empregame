import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HardskillService } from './hardskill.service';
import { CreateHardskillDto } from './dto/create-hardskill.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Hardskill } from './entities/hardskill.entity';

@Controller('hardskills')
@ApiTags('hardskills')
@ApiBearerAuth()
export class HardskillController {
  constructor(private readonly hardskillService: HardskillService) {}

  @Post()
  async create(@Body() data: CreateHardskillDto) {
    await this.hardskillService.create(data);
    return;
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
