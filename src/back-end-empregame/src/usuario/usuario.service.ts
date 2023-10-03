import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsuarioDto): Promise<void> {
    const hash = await bcrypt.hash(data.senha, 10);

    await this.prisma.usuario.create({ data: { ...data, senha: hash } });
    return;
  }

  async findAll(): Promise<Usuario[]> {
    const usuarios = await this.prisma.usuario.findMany();

    return usuarios;
  }

  async findOne(id: number): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });

    return usuario;
  }

  async update(id: number, data: UpdateUsuarioDto): Promise<void> {
    await this.prisma.usuario.update({ where: { id }, data });
    return;
  }

  async remove(id: number): Promise<void> {
    await this.prisma.usuario.delete({ where: { id } });
    return;
  }

  async findAllHardskills(id_usuario: number): Promise<any> {
    const hardskills = await this.prisma.usuarioHardskill.findMany({
      where: { id_usuario },
    });

    return hardskills;
  }
}
