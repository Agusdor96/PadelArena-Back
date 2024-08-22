import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  app.enableCors();
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
