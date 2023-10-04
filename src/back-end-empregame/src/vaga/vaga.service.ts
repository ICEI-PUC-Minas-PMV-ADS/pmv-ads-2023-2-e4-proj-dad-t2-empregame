import { Injectable } from '@nestjs/common';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Vaga } from './entities/vaga.entity';

@Injectable()
export class VagaService {
  constructor(private prisma: PrismaService) {}

  async create(id_usuario: number, data: CreateVagaDto): Promise<void> {
    await this.prisma.vaga.create({ data: { id_usuario, ...data } });
    return;
  }

  async findAll(): Promise<Vaga[]> {
    const vagas = await this.prisma.vaga.findMany();
    return vagas;
  }

  async findOne(id: number): Promise<Vaga | null> {
    const vaga = await this.prisma.vaga.findUnique({ where: { id } });
    return vaga;
  }

  async update(
    id_usuario: number,
    id: number,
    data: UpdateVagaDto,
  ): Promise<void> {
    await this.prisma.vaga.update({ where: { id_usuario, id }, data });
    return;
  }

  async remove(id_usuario: number, id: number): Promise<void> {
    await this.prisma.vaga.delete({ where: { id_usuario, id } });
    return;
  }
}
