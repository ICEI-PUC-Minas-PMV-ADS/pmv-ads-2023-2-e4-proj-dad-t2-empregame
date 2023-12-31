import { Injectable } from '@nestjs/common';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { UpdateMensagemDto } from './dto/update-mensagem.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Mensagem } from '@prisma/client';

@Injectable()
export class MensagemService {
  constructor(private prisma: PrismaService) {}

  async create(id_usuario: number, data: CreateMensagemDto): Promise<void> {
    await this.prisma.mensagem.create({ data: { ...data, id_usuario } });
    return;
  }

  async findAll(): Promise<Mensagem[]> {
    const mensagens = await this.prisma.mensagem.findMany();
    return mensagens;
  }

  async findAllMensagemMatch(id: number): Promise<Mensagem[]> {
    const mensagens = await this.prisma.mensagem.findMany({
      where: { id_vaga_candidato: id },
    });
    return mensagens;
  }

  async update(id: number, data: UpdateMensagemDto): Promise<void> {
    await this.prisma.mensagem.update({ where: { id }, data });
    return;
  }

  async remove(id: number) {
    await this.prisma.mensagem.delete({ where: { id } });
    return;
  }
}
