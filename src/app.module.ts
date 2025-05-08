import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CursoModule } from './curso/curso.module';
import { AuthenticateUser } from './authentication/authenticate.module';
import { LoggerMiddleware } from './middlewares/token.middleware';
import { TurmaModule } from './turma/turma.module';
import { SalaModule } from './sala/sala.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [AuthenticateUser, CursoModule, TurmaModule, SalaModule, FilesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('curso'),
      consumer.apply(LoggerMiddleware).forRoutes('turma');
  }
}
