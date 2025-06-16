import { Injectable }          from '@nestjs/common';
import { CreateReservaDto }    from './dto/create-reserva.dto';
import { UpdateReservaDto }    from './dto/update-reserva.dto';
import { PrismaService }       from 'src/database/Prisma.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ReservaService {
  constructor(public prisma: PrismaService) {}

  async create(createReservaDto: CreateReservaDto): Promise<any> {
    const convertIdCurso = Number(createReservaDto.idCurso);
    const convertIdTurma = Number(createReservaDto.idTurma);
    const convertIdSala = Number(createReservaDto.idSala);

    const isDis = await this.verifyReserva(
      convertIdSala,
      true,
      createReservaDto.dataInicio,
      createReservaDto.dataTermino,
      createReservaDto.horaInicio,
      createReservaDto.horaTermino
    );

    if (!isDis.isDisponivel) {
      throw new BadRequestException('Horário indisponível para reserva.');
    }

    const res = await this.prisma.reserva.create({
      data: {
        idCurso: convertIdCurso,
        idTurma: convertIdTurma,
        idSala: convertIdSala,
        dataInicio: createReservaDto.dataInicio,
        dataTermino: createReservaDto.dataTermino,
        horaInicio: createReservaDto.horaInicio,
        horaTermino: createReservaDto.horaTermino,
        situacao: true,
      },
    });

    return res;
  }

  async verifyReserva(
    idSala: number,
    situacao: boolean,
    dataInicio: string,
    dataFinal: string,
    horaInicio: string,
    horaTermino: string): Promise<{isDisponivel: boolean, reserva:any}> {
    const reserva = await this.prisma.reserva.findFirst({
      where: {
        idSala: idSala,
        situacao: situacao,
        AND: [
          {
            dataInicio: { lte: dataFinal },
          },
          {
            dataTermino: { gte: dataInicio },
          },
        ],
        OR: [
          {
            horaInicio: { lte: horaInicio },
            horaTermino: { gt: horaInicio },
          },
          {
            horaInicio: { lt: horaTermino },
            horaTermino: { gte: horaTermino },
          },
          {
            horaInicio: { gte: horaInicio },
            horaTermino: { lte: horaTermino },
          },
        ],
      }
    });

    return{
      isDisponivel: !reserva,
      reserva: reserva,
    };;
  }

  async findAll(skip: number) {
    const reserva = await this.prisma.reserva.findMany({
      orderBy: {
        dataInicio: 'asc',
      },
      include: {
        cursos: true,
        turmas: true,
        salas: true,
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
        situacao: true,
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
