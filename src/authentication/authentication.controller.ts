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
import { AuthenticateUser } from './dto/authenticate.dto';
import { AuthenticateService } from './authentication.service';

@Controller('authenticate')
export class AuthenticateController {
  constructor(private readonly user: AuthenticateService) {}

  @Post()
  authentication(
    @Body() user: { data: AuthenticateUser },
    @Res() res: Response,
  ) {
    try {
      const retorno = this.user.authenticate(user.data);

      console.log(retorno);

      if (retorno) {
        return res.status(201).json({
          message: 'Usuário Autenticado',
          data: retorno,
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possivel criar o curso',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }
}
