import { Injectable }          from '@nestjs/common';
import { CreateSalaDto }       from './dto/create-sala.dto';
import { UpdateSalaDto }       from './dto/update-sala.dto';
import { PrismaService }       from 'src/database/Prisma.service';
import { ReservaService }      from 'src/reserva/reserva.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class SalaService {
  constructor(private prisma: PrismaService) {}

  async create(createSalaDto: CreateSalaDto) {
    const convertIdCurso = createSalaDto.idCurso ? Number(createSalaDto.idCurso) : null;
    const convertIdTurma = createSalaDto.idTurma ? Number(createSalaDto.idTurma) : null;

    const dadosSala = await this.prisma.sala.create({
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

    if (convertIdTurma !== null) {
      const dadosTurma = await this.findUniqueTurmaRefCurso(convertIdCurso);

      const verifyRes = new ReservaService(this.prisma);

      const res = await verifyRes.verifyReserva(
        dadosSala.id,
        true,
        dadosTurma.dataInicio,
        dadosTurma.dataFinal,
        dadosTurma.entrada,
        dadosTurma.saida,
      );

      if (!res.isDisponivel) {
        await this.createReserva(createSalaDto, dadosSala, dadosTurma, true);
      }
    }
  }

  async createReserva(dadosSala: CreateSalaDto, retornoDadosSala, dadosTurma, reservado: boolean) {
    const convertIdCurso = dadosSala.idCurso ? Number(dadosSala.idCurso) : null;
    const convertIdTurma = dadosSala.idTurma ? Number(dadosSala.idTurma) : null;
    const convertIdSala = retornoDadosSala.id ? Number(retornoDadosSala.id) : null;

    await this.prisma.reserva.create({
     data: {
        idCurso: convertIdCurso,
        idTurma: convertIdTurma,
        idSala:  convertIdSala,
        dataInicio: dadosTurma.dataInicio,
        dataTermino: dadosTurma.dataFinal,
        horaInicio: dadosTurma.entrada,
        horaTermino: dadosTurma.saida,
        situacao: reservado,
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

  async findUniqueTurma(id: number) {
    const turma = await this.prisma.turma.findFirst({
      where: {
        id: id
      }
    });

    return turma;
  }

  async findUniqueTurmaRefCurso(id: number) {
    const turma = await this.prisma.turma.findFirst({
      where: {
        idCurso: id
      }
    });
    return turma;
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

    const dadosTurma = await this.findUniqueTurmaRefCurso(convertIdCurso);
    const verifyRes = new ReservaService(this.prisma);
    
    const res = await verifyRes.verifyReserva(
      id,
      true,
      dadosTurma.dataInicio,
      dadosTurma.dataFinal,
      dadosTurma.entrada,
      dadosTurma.saida,
    );

    // True se a sala estiver disponivel
    if (!res.isDisponivel) {
      await this.prisma.reserva.update({
        where: {
          id: res.reserva.id
        },
        data: {
          idCurso: convertIdCurso,
          idTurma: convertTurma,
          idSala: id,
          dataInicio: dadosTurma.dataInicio,
          dataTermino: dadosTurma.dataFinal,
          horaInicio: dadosTurma.entrada,
          horaTermino: dadosTurma.saida,
          situacao: true,
        }
      })
    }

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
    const convertedId = Number(id);

    // Não é possivel apagar uma sala se essa sala possuir mais vinculos com reserva
    const res = await this.prisma.reserva.findFirst({
      where: {
        idSala: id
      }
    })

    if (res.id) {
      throw new BadRequestException('Não é possível excluir a sala pois já existe vinculos!');
    }

    await this.prisma.sala.delete({
      where: {
        id: convertedId,
      },
    });

  }
}
