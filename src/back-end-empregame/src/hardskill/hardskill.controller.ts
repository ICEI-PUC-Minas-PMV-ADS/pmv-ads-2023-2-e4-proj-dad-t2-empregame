import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HardskillService } from './hardskill.service';
import { CreateHardskillDto } from './dto/create-hardskill.dto';
import { UpdateHardskillDto } from './dto/update-hardskill.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Hardskill } from './entities/hardskill.entity';

@Controller('hardskills')
@ApiTags('hardskills')
@ApiBearerAuth()
export class HardskillController {
  constructor(private readonly hardskillService: HardskillService) {}

  @Post()
  create(@Body() data: CreateHardskillDto) {
    return this.hardskillService.create(data);
  }

  @Get()
  @ApiOkResponse({ type: Hardskill, isArray: true })
  findAll() {
    return this.hardskillService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Hardskill })
  findOne(@Param('id') id: string) {
    return this.hardskillService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateHardskillDto) {
    return this.hardskillService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hardskillService.remove(+id);
  }
}
