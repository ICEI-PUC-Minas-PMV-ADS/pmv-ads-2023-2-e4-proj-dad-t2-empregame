import { Injectable } from '@nestjs/common';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Vaga } from './entities/vaga.entity';
import { CreateVagaHardskillDto } from './dto/create-vaga-hardskill.dto';
import { VagaSoftSkill } from './entities/vaga-softskill.entity';
import { VagaHardSkill } from './entities/vaga-hardskill.entity';
import { CreateVagaSoftskillDto } from './dto/create-vaga-softskill.dto';

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

  async createVagaHardskill(data: CreateVagaHardskillDto): Promise<void> {
    await this.prisma.vagaHardskill.createMany({ data });
    return;
  }

  async findAllVagaHardskills(id_vaga: number): Promise<VagaHardSkill[]> {
    const hardskills = await this.prisma.vagaHardskill.findMany({
      where: { id_vaga },
    });
    return hardskills;
  }

  async removeVagaHardskills(id_usuario: number, id: number): Promise<void> {
    await this.prisma.vagaHardskill.delete({
      where: { id, vaga: { id_usuario } },
    });
    return;
  }

  async createVagaSoftskill(data: CreateVagaSoftskillDto): Promise<void> {
    await this.prisma.vagaSoftskill.createMany({ data });
    return;
  }

  async findAllVagaSoftskills(id_vaga: number): Promise<VagaSoftSkill[]> {
    const softskills = await this.prisma.vagaSoftskill.findMany({
      where: { id_vaga },
    });
    return softskills;
  }

  async removeVagaSoftskills(id_usuario: number, id: number): Promise<void> {
    await this.prisma.vagaSoftskill.delete({
      where: { id, vaga: { id_usuario } },
    });
    return;
  }
}
