import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CursoModule } from './curso/curso.module';
import { AuthenticateUser } from './authentication/authenticate.module';
import { LoggerMiddleware } from './middlewares/token.middleware';

@Module({
  imports: [CursoModule, AuthenticateUser],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('curso');
  }
}
