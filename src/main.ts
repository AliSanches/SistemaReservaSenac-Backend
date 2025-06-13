import { NestFactory }    from '@nestjs/core';
import { AppModule }      from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join }           from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
  prefix: '/uploads/',
});

  console.log('dirname:', __dirname);
  console.log('uploads path:', join(__dirname, '..', 'uploads'));

  await app.listen(4000);
}
bootstrap();
