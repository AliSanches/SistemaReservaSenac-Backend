import { Module } from '@nestjs/common';
import { CursoModule } from './curso/curso.module';
import { AuthenticateUser } from './authentication/authenticate.module';

@Module({
  imports: [CursoModule, AuthenticateUser],
})
export class AppModule {}
