import { Injectable } from '@nestjs/common';
import { CreateSoftskillDto } from './dto/create-softskill.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Softskill } from './entities/softskill.entity';

@Injectable()
export class SoftskillService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSoftskillDto): Promise<{ id: number }> {
    const softskill = await this.prisma.softskill.create({ data });
    return softskill;
  }

  async findAll(): Promise<Softskill[]> {
    const softskills = await this.prisma.softskill.findMany();
    return softskills;
  }

  async findOne(id: number): Promise<Softskill | null> {
    const softskill = await this.prisma.softskill.findUnique({ where: { id } });
    return softskill;
  }
}
