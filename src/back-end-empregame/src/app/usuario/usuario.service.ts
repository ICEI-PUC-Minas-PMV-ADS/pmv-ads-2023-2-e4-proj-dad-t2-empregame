import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioHardskillDto } from './dto/create-usuario-hardskill.dto';
import { UsuarioHardSkill } from './entities/usuario-hardskill.entity';
import { CreateUsuarioSoftskillDto } from './dto/create-usuario-softskill.dto';
import { UsuarioSoftSkill } from './entities/usuario-softskill.entity';
import { AppError } from '../../utils/app-error';
import { UpdateUsuarioHardskillDto } from './dto/update-usuario-hardskill.dto';
import { UpdateUsuarioSoftskillDto } from './dto/update-usuario-softskill.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsuarioDto): Promise<{ id: number }> {
    const hash = await bcrypt.hash(data.senha, 10);

    const usuarioExistente = await this.prisma.usuario.findFirst({
      where: { email: data.email, situacao: 'ATIVO' },
    });

    if (usuarioExistente)
      throw new AppError('Já existe um usuário com o mesmo e-mail');

    const usuario = await this.prisma.usuario.create({
      data: { ...data, senha: hash },
    });

    return { id: usuario.id };
  }

  async findAll(): Promise<Usuario[]> {
    const usuarios = await this.prisma.usuario.findMany({
      where: { situacao: 'ATIVO' },
    });

    return usuarios;
  }

  async findOne(id: number): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id, situacao: 'ATIVO' },
      include: {
        usuario_hardskill: {
          include: { hardskill: { select: { nome: true } } },
        },
        usuario_softskill: {
          include: { softskill: { select: { nome: true } } },
        },
      },
    });

    return usuario;
  }

  async search(pesquisa?: string, hardskill?: string, softskill?: string) {
    if (pesquisa || hardskill || softskill) {
      const candidatosFiltradas = await this.prisma.usuario.findMany({
        where: {
          AND: [
            { nome: { contains: pesquisa, mode: 'insensitive' } },
            {
              usuario_hardskill: {
                every: {
                  hardskill: {
                    nome: { contains: hardskill, mode: 'insensitive' },
                  },
                },
              },
            },
            {
              usuario_softskill: {
                every: {
                  softskill: {
                    nome: { contains: softskill, mode: 'insensitive' },
                  },
                },
              },
            },
            { tipo: 'CANDIDATO' },
          ],
        },
        include: {
          usuario_hardskill: {
            include: { hardskill: { select: { nome: true } } },
          },
          usuario_softskill: {
            include: { softskill: { select: { nome: true } } },
          },
        },
      });
      return candidatosFiltradas;
    } else {
      const todasCandidatos = await this.prisma.usuario.findMany({
        where: { tipo: 'CANDIDATO', situacao: 'ATIVO' },
        include: {
          usuario_hardskill: {
            include: { hardskill: { select: { nome: true } } },
          },
          usuario_softskill: {
            include: { softskill: { select: { nome: true } } },
          },
        },
      });
      return todasCandidatos;
    }
  }

  async update(id: number, data: UpdateUsuarioDto): Promise<void> {
    await this.prisma.usuario.update({
      where: { id, situacao: 'ATIVO' },
      data,
    });
    return;
  }

  async remove(id: number): Promise<void> {
    await this.prisma.usuario.update({
      where: { id },
      data: { situacao: 'INATIVO' },
    });
    return;
  }

  async createUsuarioHardskill(data: CreateUsuarioHardskillDto): Promise<void> {
    await this.prisma.usuarioHardskill.createMany({ data });
    return;
  }

  async findAllUsuarioHardskills(
    id_usuario: number,
  ): Promise<UsuarioHardSkill[]> {
    const hardskills = await this.prisma.usuarioHardskill.findMany({
      where: { id_usuario },
    });
    return hardskills;
  }

  async updateUsuarioHardskills(
    id: number,
    data: UpdateUsuarioHardskillDto,
  ): Promise<void> {
    await this.prisma.usuarioHardskill.update({
      where: { id },
      data,
    });
    return;
  }

  async removeUsuarioHardskills(id_usuario: number, id: number): Promise<void> {
    await this.prisma.usuarioHardskill.delete({ where: { id, id_usuario } });
    return;
  }

  async createUsuarioSoftskill(data: CreateUsuarioSoftskillDto): Promise<void> {
    await this.prisma.usuarioSoftskill.createMany({ data });
    return;
  }

  async findAllUsuarioSoftskills(
    id_usuario: number,
  ): Promise<UsuarioSoftSkill[]> {
    const softskills = await this.prisma.usuarioSoftskill.findMany({
      where: { id_usuario },
    });
    return softskills;
  }

  async updateUsuarioSoftkills(
    id: number,
    data: UpdateUsuarioSoftskillDto,
  ): Promise<void> {
    await this.prisma.usuarioSoftskill.update({
      where: { id },
      data,
    });
    return;
  }

  async removeUsuarioSoftskills(id_usuario: number, id: number): Promise<void> {
    await this.prisma.usuarioSoftskill.delete({ where: { id, id_usuario } });
    return;
  }
}
