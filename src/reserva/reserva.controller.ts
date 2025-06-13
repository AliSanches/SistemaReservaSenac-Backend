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
  import { Response }         from 'express';
  import { ReservaService }   from './reserva.service';
  import { CreateReservaDto } from './dto/create-reserva.dto';
  import { UpdateReservaDto } from './dto/update-reserva.dto';
  
  @Controller('reserva')
  export class ReservaController {
    constructor(private readonly reservaService: ReservaService) {}
  
    @Post()
    create(@Body() createReservaDto: { data: CreateReservaDto }, @Res() res: Response) {
      try {
        const retorno = this.reservaService.create(createReservaDto.data);
  
        if (retorno) {
          return res.status(201).json({
            message: 'Reserva Cadastrada',
          });
        } else {
          return res.status(400).json({
            message: 'Não foi possivel criar a reserva',
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
        const retorno = await this.reservaService.findAll(+skip);
  
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
      @Body() updateReservaDto: { data: UpdateReservaDto },
      @Res() res: Response,
    ) {
      try {
        const retorno = this.reservaService.update(+id, updateReservaDto.data);
  
        if (retorno) {
          return res.status(201).json({
            message: 'Reserva Atualizada',
          });
        } else {
          return res.status(400).json({
            message: 'Não foi possivel atualizar a reserva',
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
        const retorno = this.reservaService.remove(+id);
  
        if (retorno) {
          return res.status(201).json({
            message: 'Reserva Deletada',
          });
        } else {
          return res.status(400).json({
            message: 'Não foi possivel deletar a reserva',
          });
        }
      } catch (error) {
        return res.status(500).json({
          message: 'Erro interno no servidor',
        });
      }
    }
  }
  