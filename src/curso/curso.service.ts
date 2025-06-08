import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'src/database/Prisma.service';

@Injectable()
export class CursoService {
  constructor(private prisma: PrismaService) {}

  async create(createCursoDto: CreateCursoDto) {
    const res = await this.prisma.curso.create({
      data: {
        nome: createCursoDto.nome,
        categoria: createCursoDto.categoria,
        arquivo: createCursoDto.arquivo,
      },
    });
    return res
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
    });

    const count = await this.prisma.curso.count({});

    return { curso, count };
  }

  async update(updateCursoDto: UpdateCursoDto) {
    const res = await this.prisma.curso.update({
      where: {
        id: updateCursoDto.id,
      },
      data: {
        nome: updateCursoDto.nome,
        categoria: updateCursoDto.categoria,
        arquivo: updateCursoDto.arquivo,
      },
    });
    return res;
  }

  async remove(id: number) {
    await this.prisma.curso.delete({
      where: {
        id: id,
      },
    });
  }
}
