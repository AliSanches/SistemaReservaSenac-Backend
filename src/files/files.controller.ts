import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FilesService }    from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('arquivo'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request | any) {
    console.log(file);
    try {
      this.filesService.salvarDados(file, req);
    } catch (error) {
      console.log(error)
    }
  }
}
