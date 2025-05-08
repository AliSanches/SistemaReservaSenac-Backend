import {
  Controller,
  Post,
  Body,
  Res,
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
        return res.status(200).json({
          message: 'Usuário Autenticado',
          data: retorno,
        });
      }
    } catch (error) {
      if (error.message === "Usuário ou senha inválidos") {
        return res.status(401).json({
          message: "Usuário ou senha inválidos",
        });
      } 

      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }
}
