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
import { AuthUser, IAuthUser } from 'utils/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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

  @Get(':id_vaga_candidato')
  async findAll(@Param(':id_vaga_candidato') id_vaga_candidato: string) {
    const mensagens = await this.mensagemService.findAll(+id_vaga_candidato);
    return mensagens;
  }

  @Get(':id_vaga_candidato/:id')
  async findOne(
    @Param(':id_vaga_candidato') id_vaga_candidato: string,
    @Param('id') id: string,
  ) {
    const mensagem = await this.mensagemService.findOne(
      +id_vaga_candidato,
      +id,
    );
    return mensagem;
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
