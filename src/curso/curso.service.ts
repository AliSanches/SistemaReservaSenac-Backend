import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'src/database/Prisma.service';

@Injectable()
export class CursoService {
  constructor(private prisma: PrismaService) { }

  async create(createCursoDto: CreateCursoDto) {
    const res = await this.prisma.curso.create({
      data: {
        nome: createCursoDto.nome,
        categoria: createCursoDto.categoria,
        arquivo: '',
      },
    });
    return res;
  }

  async findOne(id: number) {
    const curso = await this.prisma.curso.findUnique({
      where: {
        id: id
      },
      select: {
        nome: true,
        categoria: true,
        arquivo: true
      }
    });

    return curso;
  }

  async findAll(skip: number) {
    const curso = await this.prisma.curso.findMany({
      orderBy: {
        nome: 'asc',
      },
      take: 6,
      skip: skip,
      select: {
        id: true,
        nome: true,
        categoria: true,
        arquivo: true,
        turma: true,
      }
    });

    const count = await this.prisma.curso.count({});

    return { curso, count };
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    const res = await this.prisma.curso.update({
      where: {
        id
      },
      data: {
        nome: updateCursoDto.nome,
        categoria: updateCursoDto.categoria,
        arquivo: '',
      },
    });
    return res;
  }

  async remove(id: number) {
    const response = await this.prisma.curso.delete({
      where: {
        id: id,
      },
    });

    return response;
  }
}
