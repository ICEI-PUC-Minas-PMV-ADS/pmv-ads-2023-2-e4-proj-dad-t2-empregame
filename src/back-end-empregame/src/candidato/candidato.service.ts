import { Injectable } from '@nestjs/common';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidatoService {
  constructor(private prisma: PrismaService) {}

  create(createCandidatoDto: CreateCandidatoDto) {
    return this.prisma.candidato.create({ data: createCandidatoDto });
  }

  findAll() {
    return this.prisma.candidato.findMany();
  }

  findOne(id: number) {
    return this.prisma.candidato.findUnique({ where: { id } });
  }

  update(id: number, updateCandidatoDto: UpdateCandidatoDto) {
    return this.prisma.candidato.update({
      where: { id },
      data: updateCandidatoDto,
    });
  }

  remove(id: number) {
    return this.prisma.candidato.delete({ where: { id } });
  }
}
