import * as AppPrepare from './app.prepare';
AppPrepare.setup();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppInfo } from './app.info';

async function bootstrap() {
  console.log(`Starting ${AppInfo.name} Services....`);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
