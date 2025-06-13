import { Module }             from '@nestjs/common';
import { ReservaService }     from './reserva.service';
import { ReservaController }  from './reserva.controller';
import { PrismaModule }       from 'src/database/Prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
