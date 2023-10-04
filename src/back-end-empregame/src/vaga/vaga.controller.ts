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
import { AuthUser, IAuthUser } from 'utils/decorators/auth.decorator';

@Controller('vagas')
@ApiTags('vagas')
@ApiBearerAuth()
export class VagaController {
  constructor(private readonly vagaService: VagaService) {}

  @Post()
  async create(@AuthUser() user: IAuthUser, @Body() data: CreateVagaDto) {
    await this.vagaService.create(user.usuario.id, data);
    return;
  }

  @Get()
  @ApiOkResponse({ type: Vaga, isArray: true })
  async findAll() {
    const vagas = await this.vagaService.findAll();
    return vagas;
  }

  @Get(':id')
  @ApiOkResponse({ type: Vaga })
  async findOne(@Param('id') id: string) {
    const vaga = await this.vagaService.findOne(+id);
    return vaga;
  }

  @Patch(':id')
  async update(
    @AuthUser() user: IAuthUser,
    @Param('id') id: string,
    @Body() data: UpdateVagaDto,
  ) {
    this.vagaService.update(user.usuario.id, +id, data);
    return;
  }

  @Delete(':id')
  async remove(@AuthUser() user: IAuthUser, @Param('id') id: string) {
    this.vagaService.remove(user.usuario.id, +id);
    return;
  }
}
