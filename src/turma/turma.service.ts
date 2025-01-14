import { Injectable } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { PrismaService } from 'src/database/Prisma.service';

@Injectable()
export class TurmaService {
  constructor(private prisma: PrismaService) {}

  async create(createTurmaDto: CreateTurmaDto) {
    const convertIdCurso = Number(createTurmaDto.idCurso);
    const convertTurma = Number(createTurmaDto.turma);

    await this.prisma.turma.create({
      data: {
        idCurso: convertIdCurso,
        turma: convertTurma,
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
      include: {
        cursos: true,
      },
      take: 6,
      skip: skip,
    });

    const count = await this.prisma.turma.count({});

    return { turma, count };
  }

  async update(id: number, updateTurmaDto: UpdateTurmaDto): Promise<void> {
    const convertIdCurso = Number(updateTurmaDto.idCurso);
    const convertTurma = Number(updateTurmaDto.turma);

    await this.prisma.turma.update({
      where: {
        id: id,
      },
      data: {
        idCurso: convertIdCurso,
        turma: convertTurma,
        dataInicio: updateTurmaDto.dataInicio,
        dataFinal: updateTurmaDto.dataFinal,
        entrada: updateTurmaDto.entrada,
        saida: updateTurmaDto.saida,
      },
    });
  }

  async remove(id: number) {
    const converTurma = Number(id);

    await this.prisma.turma.delete({
      where: {
        id: converTurma,
      },
    });
  }
}
