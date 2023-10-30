import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VagaService } from './vaga.service';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Vaga } from './entities/vaga.entity';

import { CreateVagaHardskillDto } from './dto/create-vaga-hardskill.dto';
import { VagaHardSkill } from './entities/vaga-hardskill.entity';
import { CreateVagaSoftskillDto } from './dto/create-vaga-softskill.dto';
import { VagaSoftSkill } from './entities/vaga-softskill.entity';
import { AuthUser, IAuthUser } from '../../utils/decorators/auth.decorator';
import { CreateVagaCandidatoDto } from './dto/create-vaga-candidato.dto';
import { VagaCandidato } from './entities/vaga-candidato.entity';
import { UpdateVagaCandidatoDto } from './dto/update-vaga-candidato.dto';

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

  @ApiBearerAuth()
  @Get()
  @ApiQuery({ name: 'pesquisa', required: false })
  @ApiQuery({ name: 'hardskill', required: false })
  @ApiQuery({ name: 'softskill', required: false })
  @ApiQuery({ name: 'situacao', required: false })
  async search(
    @Query('pesquisa') pesquisa?: string,
    @Query('hardskill') hardskill?: string,
    @Query('softskill') softskill?: string,
    @Query('situacao') situacao?: string,
  ) {
    const vagas = await this.vagaService.search(
      pesquisa,
      hardskill,
      softskill,
      situacao,
    );
    return vagas;
  }

  @ApiBearerAuth()
  @Post('hardskills')
  async createVagaHardskills(@Body() data: CreateVagaHardskillDto) {
    await this.vagaService.createVagaHardskill(data);
    return;
  }

  @ApiBearerAuth()
  @Get('hardskills/:id')
  @ApiOkResponse({
    type: VagaHardSkill,
    isArray: true,
  })
  async findVagaHardskills(@Param('id') id: string) {
    const hardskills = await this.vagaService.findAllVagaHardskills(+id);
    return hardskills;
  }

  @ApiBearerAuth()
  @Delete('hardskills/:id')
  async removeVagaHardskills(
    @AuthUser() user: IAuthUser,
    @Param('id') id: string,
  ) {
    await this.vagaService.removeVagaHardskills(user.usuario.id, +id);
    return;
  }

  @ApiBearerAuth()
  @Post('softskills')
  async createVagaSoftskills(
    @Body() data: CreateVagaSoftskillDto,
  ): Promise<void> {
    await this.vagaService.createVagaSoftskill(data);
    return;
  }

  @ApiBearerAuth()
  @Get('softskills/:id')
  @ApiOkResponse({
    type: VagaSoftSkill,
    isArray: true,
  })
  async findVagaSoftskills(@Param('id') id: string) {
    const softskills = await this.vagaService.findAllVagaSoftskills(+id);
    return softskills;
  }

  @ApiBearerAuth()
  @Delete('softskills/:id')
  async removeVagaSoftskills(
    @AuthUser() user: IAuthUser,
    @Param('id') id: string,
  ) {
    await this.vagaService.removeVagaSoftskills(user.usuario.id, +id);
    return;
  }

  @ApiBearerAuth()
  @Post('match')
  async createVagaCandidato(@Body() data: CreateVagaCandidatoDto) {
    await this.vagaService.createVagaCandidato(data);
    return;
  }

  @ApiBearerAuth()
  @Patch('match/:id')
  async updateVagaCandidato(
    @Param('id') id: string,
    @Body() data: UpdateVagaCandidatoDto,
  ) {
    await this.vagaService.updateVagaCandidato(+id, data);
    return;
  }

  @ApiBearerAuth()
  @Delete('match/:id')
  async removeVagaCandidato(@Param('id') id: string) {
    await this.vagaService.removeVagaCandidatos(+id);
    return;
  }

  @ApiBearerAuth()
  @Get('match')
  @ApiOkResponse({
    type: VagaCandidato,
    isArray: true,
  })
  async findAllVagaCandidato(@Param('id') id: string) {
    const candidatosInteressados = await this.vagaService.findAllVagaCandidatos(
      +id,
    );
    return candidatosInteressados;
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
