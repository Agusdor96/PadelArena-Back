import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { CategoryService } from './category/category.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  app.enableCors();

  const categoryService = app.get(CategoryService)
  await categoryService.preloadCategories()

  await app.listen(Number(process.env.SERVER_PORT));
}
bootstrap();
