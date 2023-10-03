import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';
import { Public } from 'decorators/is-public.decorator';
import { AuthUser, IAuthUser } from 'utils/decorators/auth.decorator';

@Controller('usuario')
@ApiTags('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Public()
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({
    type: Usuario,
    isArray: true,
  })
  async findAll() {
    return this.usuarioService.findAll();
  }

  @ApiBearerAuth()
  @Get('hardskills')
  async findHardskills(@AuthUser() user: IAuthUser) {
    return this.usuarioService.findAllHardskills(user.usuario.id);
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
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
