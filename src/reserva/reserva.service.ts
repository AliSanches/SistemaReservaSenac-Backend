import { Injectable }       from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { PrismaService }    from 'src/database/Prisma.service';

@Injectable()
export class ReservaService {
  constructor(private prisma: PrismaService) {}

  async create(createReservaDto: CreateReservaDto) {
    const convertIdCurso = Number(createReservaDto.idCurso);
    const convertIdTurma = Number(createReservaDto.idTurma);
    const convertIdSala = Number(createReservaDto.idSala);

    await this.prisma.reserva.create({
      data: {
        idCurso: convertIdCurso,
        idTurma: convertIdTurma,
        idSala: convertIdSala,
        dataInicio: createReservaDto.dataInicio,
        dataTermino: createReservaDto.dataTermino,
        horaInicio: createReservaDto.horaInicio,
        horaTermino: createReservaDto.horaTermino,
        situacao: createReservaDto.situacao,
      },
    });
  }

  async findAll(skip: number) {
    const reserva = await this.prisma.reserva.findMany({
      orderBy: {
        dataInicio: 'asc',
      },
      include: {
        cursos: true,
      },
      take: 6,
      skip: skip,
    });

    const count = await this.prisma.reserva.count({});

    return { reserva, count };
  }

  async update(id: number, updateReservaDto: UpdateReservaDto): Promise<void> {
    const convertIdCurso = Number(updateReservaDto.idCurso);
    const convertTurma = Number(updateReservaDto.idTurma);
    const convertIdSala = Number(updateReservaDto.idSala);

    await this.prisma.reserva.update({
      where: {
        id: id,
      },
      data: {
        idCurso: convertIdCurso,
        idTurma: convertTurma,
        idSala: convertIdSala,
        dataInicio: updateReservaDto.dataInicio,
        dataTermino: updateReservaDto.dataTermino,
        horaInicio: updateReservaDto.horaInicio,
        horaTermino: updateReservaDto.horaTermino,
        situacao: updateReservaDto.situacao,
      },
    });
  }

  async remove(id: number) {
    const converTurma = Number(id);

    await this.prisma.reserva.delete({
      where: {
        id: converTurma,
      },
    });
  }
}
