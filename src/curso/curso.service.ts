import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'src/database/Prisma.service';

@Injectable()
export class CursoService {
  constructor(private prisma: PrismaService) {}

  async create(createCursoDto: CreateCursoDto) {
    await this.prisma.curso.create({
      data: {
        nome: createCursoDto.nome,
        categoria: createCursoDto.categoria,
      },
    });
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

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<void> {
    await this.prisma.curso.update({
      where: {
        id: id,
      },
      data: {
        nome: updateCursoDto.nome,
        categoria: updateCursoDto.categoria,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.curso.delete({
      where: {
        id: id,
      },
    });
  }
}
