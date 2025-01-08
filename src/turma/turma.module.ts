import { Module } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { PrismaModule } from 'src/database/Prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TurmaController],
  providers: [TurmaService],
})
export class TurmaModule {}
