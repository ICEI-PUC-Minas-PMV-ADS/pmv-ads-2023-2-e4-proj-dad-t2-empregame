import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { UpdateMensagemDto } from './dto/update-mensagem.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser, IAuthUser } from '../../utils/decorators/auth.decorator';

@Controller('mensagens')
@ApiTags('mensagens')
@ApiBearerAuth()
export class MensagemController {
  constructor(private readonly mensagemService: MensagemService) {}

  @Post()
  async create(@AuthUser() user: IAuthUser, @Body() data: CreateMensagemDto) {
    await this.mensagemService.create(user.usuario.id, data);
    return;
  }

  @Get()
  async findAll() {
    const mensagens = await this.mensagemService.findAll();
    return mensagens;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const mensagens = await this.mensagemService.findAllMensagemMatch(+id);
    return mensagens;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateMensagemDto) {
    await this.mensagemService.update(+id, data);
    return;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.mensagemService.remove(+id);
    return;
  }
}
