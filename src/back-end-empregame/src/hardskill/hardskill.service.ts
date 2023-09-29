import { Injectable } from '@nestjs/common';
import { CreateHardskillDto } from './dto/create-hardskill.dto';
import { UpdateHardskillDto } from './dto/update-hardskill.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Hardskill } from './entities/hardskill.entity';

@Injectable()
export class HardskillService {
  constructor(private prisma:PrismaService){}

  async create(data: CreateHardskillDto):Promise<void> {
    await this.prisma.hardskill.create({data})
    return;
  }

  async findAll():Promise<Hardskill[]> {
    const hardskills=await this.prisma.hardskill.findMany();
    return hardskills;
  }

  async findOne(id: number):Promise<Hardskill | null> {
    const hardskill= await this.prisma.hardskill.findUnique({where:{id}});
    return hardskill;
  }

  async update(id: number, data: UpdateHardskillDto):Promise<void> {
    await this.prisma.hardskill.update({where:{id},data})
    return;
  }

  async remove(id: number):Promise<void> {
    await this.prisma.hardskill.delete({where:{id}})
    return ;
  }
}
