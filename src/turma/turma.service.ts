import { Injectable } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { PrismaService } from 'src/database/Prisma.service';

@Injectable()
export class TurmaService {
  constructor(private prisma: PrismaService) {}

  async create(createTurmaDto: CreateTurmaDto) {
    await this.prisma.turma.create({
      data: {
        idCurso: createTurmaDto.curso,
        turma: createTurmaDto.turma,
        dataInicio: createTurmaDto.dataInicio,
        dataFinal: createTurmaDto.dataFinal,
        entrada: createTurmaDto.entrada,
        saida: createTurmaDto.saida,
      },
    });
  }

  async findAll(skip: number) {
    const turma = await this.prisma.turma.findMany({
      orderBy: {
        turma: 'asc',
      },
      take: 6,
      skip: skip,
    });

    const count = await this.prisma.turma.count({});

    return { turma, count };
  }

  async update(id: number, updateTurmaDto: UpdateTurmaDto): Promise<void> {
    await this.prisma.turma.update({
      where: {
        id: id,
      },
      data: {
        idCurso: updateTurmaDto.curso,
        turma: updateTurmaDto.turma,
        dataInicio: updateTurmaDto.dataInicio,
        dataFinal: updateTurmaDto.dataFinal,
        entrada: updateTurmaDto.entrada,
        saida: updateTurmaDto.saida,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.turma.delete({
      where: {
        id: id,
      },
    });
  }
}
