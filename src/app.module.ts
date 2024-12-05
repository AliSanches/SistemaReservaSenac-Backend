import { Module } from '@nestjs/common';
import { CursoModule } from './curso/curso.module';

@Module({
  imports: [CursoModule],
})
export class AppModule {}
