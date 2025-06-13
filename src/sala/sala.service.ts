import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { PrismaService } from 'src/database/Prisma.service';

@Injectable()
export class SalaService {
  constructor(private prisma: PrismaService) {}

  async create(createSalaDto: CreateSalaDto) {
    const convertIdCurso = createSalaDto.idCurso ? Number(createSalaDto.idCurso) : null;
    const convertIdTurma = createSalaDto.idTurma ? Number(createSalaDto.idTurma) : null;

    await this.prisma.sala.create({
      data: {
        ...(convertIdCurso !== null && { idCurso: convertIdCurso }),
        ...(convertIdTurma !== null && { idTurma: convertIdTurma }),
        
        numeroSala: createSalaDto.numeroSala,
        capacidade: createSalaDto.capacidade,
        tipoSala: createSalaDto.tipoSala,
        caseArmario: createSalaDto.caseArmario,
        comportaNotebook: createSalaDto.comportaNotebook,
      },
    });
  }

  async findAll(skip: number) {
    const sala = await this.prisma.sala.findMany({
      orderBy: {
        numeroSala: 'asc',
      },
      include: {
        cursos: true,
        turmas: true,
      },
      take: 6,
      skip: skip,
    });

    const count = await this.prisma.sala.count({});

    return { sala, count };
  }

  async findAllTurmasRefCurso(id: number) {
    const turma = await this.prisma.turma.findMany({
      where: {
        idCurso: id
      }
    });

    const count = await this.prisma.sala.count({});

    return { turma, count };
  }

  async update(id: number, updateSalaDto: UpdateSalaDto): Promise<void> {
    const convertIdCurso = Number(updateSalaDto.idCurso);
    const convertTurma = Number(updateSalaDto.idTurma);

    await this.prisma.sala.update({
      where: {
        id: id,
      },
      data: {
        idCurso: convertIdCurso,
        idTurma: convertTurma,
        numeroSala: updateSalaDto.numeroSala,
        capacidade: updateSalaDto.capacidade,
        tipoSala: updateSalaDto.tipoSala,
        caseArmario: updateSalaDto.caseArmario,
        comportaNotebook: updateSalaDto.comportaNotebook,
      },
    });
  }

  async remove(id: number) {
    const converTurma = Number(id);

    await this.prisma.sala.delete({
      where: {
        id: converTurma,
      },
    });
  }
}
