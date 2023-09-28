import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VagaService } from './vaga.service';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Vaga } from './entities/vaga.entity';

@Controller('vaga')
@ApiTags('vaga')
@ApiBearerAuth()
export class VagaController {
  constructor(private readonly vagaService: VagaService) {}

  @Post()
  create(@Body() data: CreateVagaDto) {
    return this.vagaService.create(data);
  }

  @Get()
  @ApiOkResponse({ type: Vaga, isArray: true })
  findAll() {
    return this.vagaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Vaga })
  findOne(@Param('id') id: string) {
    return this.vagaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateVagaDto) {
    return this.vagaService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vagaService.remove(+id);
  }
}
