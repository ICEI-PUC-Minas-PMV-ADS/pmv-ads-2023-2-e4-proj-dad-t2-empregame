import { Injectable } from '@nestjs/common';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Vaga } from './entities/vaga.entity';
import { CreateVagaHardskillDto } from './dto/create-vaga-hardskill.dto';
import { VagaSoftSkill } from './entities/vaga-softskill.entity';
import { VagaHardSkill } from './entities/vaga-hardskill.entity';
import { CreateVagaSoftskillDto } from './dto/create-vaga-softskill.dto';
import { CreateVagaCandidatoDto } from './dto/create-vaga-candidato.dto';
import { UpdateVagaCandidatoDto } from './dto/update-vaga-candidato.dto';
import { VagaCandidato } from './entities/vaga-candidato.entity';

@Injectable()
export class VagaService {
  constructor(private prisma: PrismaService) {}

  async create(
    id_usuario: number,
    data: CreateVagaDto,
  ): Promise<{ id: number }> {
    const vaga = await this.prisma.vaga.create({
      data: { id_usuario, ...data },
    });
    return { id: vaga.id };
  }

  async search(
    pesquisa?: string,
    hardskill?: string,
    softskill?: string,
    situacao?: string,
  ) {
    if (pesquisa || hardskill || softskill || situacao) {
      const vagasFiltradas = await this.prisma.vaga.findMany({
        where: {
          AND: [
            { nome: { contains: pesquisa, mode: 'insensitive' } },
            {
              vaga_hardskill: {
                some: {
                  hardskill: {
                    nome: { contains: hardskill, mode: 'insensitive' },
                  },
                },
              },
            },
            {
              vaga_softskill: {
                some: {
                  softskill: {
                    nome: { contains: softskill, mode: 'insensitive' },
                  },
                },
              },
            },
            { situacao: situacao },
          ],
        },
        include: {
          vaga_hardskill: {
            include: { hardskill: { select: { nome: true } } },
          },
          vaga_softskill: {
            include: { softskill: { select: { nome: true } } },
          },
          vaga_candidato: {
            include: {
              usuario: { select: { nome: true, id: true } },
              vaga: {
                select: {
                  nome: true,
                  usuario: { select: { nome: true, id: true } },
                },
              },
            },
          },
          usuario: { select: { nome: true, id: true } },
        },
      });
      return vagasFiltradas;
    } else {
      const todasVagas = await this.prisma.vaga.findMany({
        include: {
          vaga_hardskill: {
            include: { hardskill: { select: { nome: true } } },
          },
          vaga_softskill: {
            include: { softskill: { select: { nome: true } } },
          },
          vaga_candidato: { select: { _count: true } },
          usuario: { select: { nome: true, id: true } },
        },
      });
      return todasVagas;
    }
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
      include: { hardskill: { select: { nome: true } } },
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
      include: { softskill: { select: { nome: true } } },
    });
    return softskills;
  }

  async removeVagaSoftskills(id_usuario: number, id: number): Promise<void> {
    await this.prisma.vagaSoftskill.delete({
      where: { id, vaga: { id_usuario } },
    });
    return;
  }

  async createVagaCandidato(data: CreateVagaCandidatoDto): Promise<void> {
    await this.prisma.vagaCandidato.create({ data });
    return;
  }

  async updateVagaCandidato(
    id: number,
    data: UpdateVagaCandidatoDto,
  ): Promise<void> {
    await this.prisma.vagaCandidato.update({ where: { id }, data });
    return;
  }

  async findAllVagaCandidatos(id_vaga: number): Promise<VagaCandidato[]> {
    const candidatosInteressados = await this.prisma.vagaCandidato.findMany({
      where: { id_vaga },
      include: {
        usuario: { select: { nome: true, id: true } },
        vaga: {
          select: { nome: true, usuario: { select: { nome: true, id: true } } },
        },
      },
    });
    return candidatosInteressados;
  }

  async removeVagaCandidatos(id: number): Promise<void> {
    await this.prisma.vagaCandidato.delete({
      where: { id },
    });
    return;
  }
}
