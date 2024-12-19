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
  Redirect,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticateUser } from './dto/authenticate.dto';
import { AuthenticateService } from './authentication.service';

@Controller('authenticate')
export class AuthenticateController {
  constructor(private readonly user: AuthenticateService) {}

  @Post()
  async authentication(
    @Body() user: { data: AuthenticateUser },
    @Res() res: Response,
  ) {
    try {
      const retorno = await this.user.authenticate(user.data);

      if (retorno) {
        return res
          .status(200)
          .json({
            message: 'Usuário Autenticado',
            data: retorno,
          })
          .redirect('/app/home');
      } else {
        return res
          .status(400)
          .json({
            message: 'Não foi possivel autenticar o usuário',
          })
          .redirect('/app');
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          message: 'Erro interno no servidor',
        })
        .redirect('/app');
    }
  }
}
