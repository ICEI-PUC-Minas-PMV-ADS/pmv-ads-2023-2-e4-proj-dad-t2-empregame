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
  create(@Body() data: CreateSoftskillDto) {
    return this.softskillService.create(data);
  }

  @Get()
  @ApiOkResponse({ type: Softskill, isArray: true })
  findAll() {
    return this.softskillService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Softskill })
  findOne(@Param('id') id: string) {
    return this.softskillService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateSoftskillDto) {
    return this.softskillService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softskillService.remove(+id);
  }
}
