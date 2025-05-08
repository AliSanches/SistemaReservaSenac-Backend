import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaModule } from 'src/database/Prisma.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [PrismaModule, MulterModule.register ({
    dest: './uploads'
  })],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
