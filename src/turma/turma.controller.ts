import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

@Controller('turma')
export class TurmaController {
  constructor(private readonly turmaService: TurmaService) {}

  @Post()
  create(
    @Body() createTurmaDto: { data: CreateTurmaDto },
    @Res() res: Response,
  ) {
    try {
      const retorno = this.turmaService.create(createTurmaDto.data);

      if (retorno) {
        return res.status(201).json({
          message: 'Turma Cadastrada',
          data: retorno,
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possivel criar a turma',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }

  @Get()
  async findAll(@Query('skip') skip: number, @Res() res: Response) {
    try {
      const retorno = await this.turmaService.findAll(+skip);

      if (retorno) {
        return res.status(200).json({
          retorno,
        });
      } else if (retorno) {
        return res.status(400).json({
          message: 'Não foi possivel carregar os dados',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTurmaDto: { data: UpdateTurmaDto },
    @Res() res: Response,
  ) {
    try {
      const retorno = this.turmaService.update(+id, updateTurmaDto.data);

      if (retorno) {
        return res.status(201).json({
          message: 'Turma Atualizada',
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possivel atualizar a turma',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() res: Response) {
    try {
      const retorno = this.turmaService.remove(+id);

      if (retorno) {
        return res.status(201).json({
          message: 'Turma Deletada',
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possivel deletar a turma',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }
}
