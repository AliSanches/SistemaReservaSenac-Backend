import { Injectable }    from '@nestjs/common';
import { PrismaService } from 'src/database/Prisma.service';
import { Request }       from 'express';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}

  async salvarDados(file: Express.Multer.File, req: Request) {
    const url = `${req.protocol}://${req.get('host')}/files/${file.filename}`;

    const arquivo = await this.prisma.file.create({
      data: {
        fileName: file.filename,
        contentLength: file.size,
        contentType: file.mimetype,
        url: url,
      },
    });

    return arquivo;
  }
}