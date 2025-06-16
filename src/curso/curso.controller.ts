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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor }  from '@nestjs/platform-express';
import { Response }         from 'express';
import { CursoService }     from './curso.service';
import { CreateCursoDto }   from './dto/create-curso.dto';
import { UpdateCursoDto }   from './dto/update-curso.dto';
import { diskStorage }      from 'multer';
import { extname, join }    from 'path';
import { unlink }           from 'fs/promises';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('arquivo', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async create(
    @Body() createCursoDto: CreateCursoDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const retorno = await this.cursoService.create({...createCursoDto, arquivo: file?.filename || null});
      if (retorno) {
        return res.status(201).json({
          message: 'Curso cadastrado',
          data: retorno,
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possível criar o curso',
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
      const retorno = await this.cursoService.findAll(+skip);

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
   @UseInterceptors(FileInterceptor('arquivo', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async update(@Param('id') id: number, @Body() updateCursoDto: UpdateCursoDto, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {
      const curso = await this.cursoService.findOne(+id);

      if (curso.arquivo) {
        const filePath = join(process.cwd(), 'uploads', curso.arquivo);
        await unlink(filePath);
      }

      const retorno = await this.cursoService.update({...updateCursoDto,  arquivo: file?.filename || null});
      
      if (retorno) {
        return res.status(201).json({
          message: 'Curso Atualizado',
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possivel atualizar o curso',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    try {
      const curso = await this.cursoService.findOne(+id);

      if (curso.arquivo) {
        const filePath = join(process.cwd(), 'uploads', curso.arquivo);
        await unlink(filePath);
      }

      const retorno = await this.cursoService.remove(+id);

      if (retorno) {
        return res.status(201).json({
          message: 'Curso Deletado',
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possivel deletar o curso',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }
}
