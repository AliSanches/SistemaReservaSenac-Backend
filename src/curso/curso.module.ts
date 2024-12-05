import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { PrismaModule } from 'src/database/Prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}
