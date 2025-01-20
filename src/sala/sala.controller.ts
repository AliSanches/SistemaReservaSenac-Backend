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
import { SalaService } from './sala.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';

@Controller('sala')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Post()
  create(@Body() createSalaDto: { data: CreateSalaDto }, @Res() res: Response) {
    try {
      const retorno = this.salaService.create(createSalaDto.data);

      if (retorno) {
        return res.status(201).json({
          message: 'Sala Cadastrada',
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possivel criar a sala',
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
      const retorno = await this.salaService.findAll(+skip);

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
    @Body() updateSalaDto: { data: UpdateSalaDto },
    @Res() res: Response,
  ) {
    try {
      const retorno = this.salaService.update(+id, updateSalaDto.data);

      if (retorno) {
        return res.status(201).json({
          message: 'Sala Atualizada',
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possivel atualizar a sala',
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
      const retorno = this.salaService.remove(+id);

      if (retorno) {
        return res.status(201).json({
          message: 'Sala Deletada',
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possivel deletar a sala',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }
}
