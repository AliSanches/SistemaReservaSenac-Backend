import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { PrismaService } from 'src/database/Prisma.service';

@Injectable()
export class SalaService {
  constructor(private prisma: PrismaService) {}

  async create(createSalaDto: CreateSalaDto) {
    const convertIdCurso = Number(createSalaDto.idCurso);
    const convertIdTurma = Number(createSalaDto.idTurma);

    await this.prisma.sala.create({
      data: {
        idCurso: convertIdCurso,
        idTurma: convertIdTurma,
        numeroSala: createSalaDto.numeroSala,
        capacidade: createSalaDto.capacidade,
        tipoSala: createSalaDto.tipoSala,
        case: createSalaDto.case,
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
      },
      take: 6,
      skip: skip,
    });

    const count = await this.prisma.sala.count({});

    return { sala, count };
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
        case: updateSalaDto.case,
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
