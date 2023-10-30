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
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';

import { CreateUsuarioHardskillDto } from './dto/create-usuario-hardskill.dto';
import { UsuarioHardSkill } from './entities/usuario-hardskill.entity';
import { CreateUsuarioSoftskillDto } from './dto/create-usuario-softskill.dto';
import { UsuarioSoftSkill } from './entities/usuario-softskill.entity';
import { Public } from '../../utils/decorators/is-public.decorator';
import { AuthUser, IAuthUser } from '../../utils/decorators/auth.decorator';

@Controller('usuarios')
@ApiTags('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Public()
  @Post()
  async create(@Body() data: CreateUsuarioDto) {
    const usuario = await this.usuarioService.create(data);
    return usuario;
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({
    type: Usuario,
    isArray: true,
  })
  async findAll(): Promise<Usuario[]> {
    const usuarios = await this.usuarioService.findAll();
    return usuarios;
  }

  @ApiBearerAuth()
  @Get('/candidatos')
  @ApiOkResponse({ type: Usuario, isArray: true })
  @ApiQuery({ name: 'pesquisa', required: false })
  @ApiQuery({ name: 'hardskill', required: false })
  @ApiQuery({ name: 'softskill', required: false })
  async search(
    @Query('pesquisa') pesquisa: string,
    @Query('hardskill') hardskill: string,
    @Query('softskill') softskill: string,
  ) {
    const candidatos = await this.usuarioService.search(
      pesquisa,
      hardskill,
      softskill,
    );
    return candidatos;
  }

  @Post('hardskills')
  @Public()
  async createUsuarioHardskills(@Body() data: CreateUsuarioHardskillDto) {
    await this.usuarioService.createUsuarioHardskill(data);
    return;
  }

  @ApiBearerAuth()
  @Get('hardskills/:id')
  @ApiOkResponse({
    type: UsuarioHardSkill,
    isArray: true,
  })
  async findUsuarioHardskills(@Param('id') id: string) {
    const hardskills = await this.usuarioService.findAllUsuarioHardskills(+id);
    return hardskills;
  }

  @ApiBearerAuth()
  @Delete('hardskills/:id')
  async removeUsuarioHardskills(
    @AuthUser() user: IAuthUser,
    @Param('id') id: string,
  ) {
    await this.usuarioService.removeUsuarioHardskills(user.usuario.id, +id);
    return;
  }

  @Post('softskills')
  @Public()
  async createUsuarioSoftskills(
    @Body() data: CreateUsuarioSoftskillDto,
  ): Promise<void> {
    await this.usuarioService.createUsuarioSoftskill(data);
    return;
  }

  @ApiBearerAuth()
  @Get('softskills/:id')
  @ApiOkResponse({
    type: UsuarioSoftSkill,
    isArray: true,
  })
  async findUsuarioSoftskills(@Param('id') id: string) {
    const softskills = await this.usuarioService.findAllUsuarioSoftskills(+id);
    return softskills;
  }

  @ApiBearerAuth()
  @Delete('softskills/:id')
  async removeUsuarioSoftskills(
    @AuthUser() user: IAuthUser,
    @Param('id') id: string,
  ) {
    await this.usuarioService.removeUsuarioSoftskills(user.usuario.id, +id);
    return;
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({
    type: Usuario,
  })
  async findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch()
  async update(@AuthUser() user: IAuthUser, @Body() data: UpdateUsuarioDto) {
    await this.usuarioService.update(user.usuario.id, data);
    return;
  }

  @ApiBearerAuth()
  @Delete()
  async remove(@AuthUser() user: IAuthUser) {
    await this.usuarioService.remove(user.usuario.id);
    return;
  }
}
