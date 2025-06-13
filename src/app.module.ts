import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CursoModule }      from './curso/curso.module';
import { AuthenticateUser } from './authentication/authenticate.module';
import { LoggerMiddleware } from './middlewares/token.middleware';
import { TurmaModule }      from './turma/turma.module';
import { SalaModule }       from './sala/sala.module';
import { FilesModule }      from './files/files.module';
import { ReservaModule }    from './reserva/reserva.module';

@Module({
  imports: [AuthenticateUser, CursoModule, TurmaModule, SalaModule, ReservaModule, FilesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('curso'),
    consumer.apply(LoggerMiddleware).forRoutes('turma');
    consumer.apply(LoggerMiddleware).forRoutes('sala');
    consumer.apply(LoggerMiddleware).forRoutes('reserva');
  }
}
