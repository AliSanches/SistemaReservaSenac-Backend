import { Module } from '@nestjs/common';
import { AuthenticateController } from './authentication.controller';
import { AuthenticateService } from './authentication.service';
import { PrismaModule } from 'src/database/Prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthenticateController],
  providers: [AuthenticateService],
})
export class AuthenticateUser {}
