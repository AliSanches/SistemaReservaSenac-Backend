import { Module } from '@nestjs/common';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';
import { PrismaModule } from 'src/database/Prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SalaController],
  providers: [SalaService],
})
export class SalaModule {}
