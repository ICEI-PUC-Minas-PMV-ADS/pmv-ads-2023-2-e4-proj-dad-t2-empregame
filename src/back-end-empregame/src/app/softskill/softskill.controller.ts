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
import { UpdateSoftskillDto } from './dto/update-softskill.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Softskill } from './entities/softskill.entity';

@Controller('softskills')
@ApiTags('softskills')
@ApiBearerAuth()
export class SoftskillController {
  constructor(private readonly softskillService: SoftskillService) {}

  @Post()
  async create(@Body() data: CreateSoftskillDto) {
    await this.softskillService.create(data);
    return;
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateSoftskillDto) {
    await this.softskillService.update(+id, data);
    return;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.softskillService.remove(+id);
    return;
  }
}
