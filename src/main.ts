import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { CategoryService } from './category/category.service';
import {UserService} from './user/user.service';
import {TeamService} from './team/team.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  app.enableCors();

  const categoryService = app.get(CategoryService)
  await categoryService.preloadCategories()
  const userService = app.get(UserService);
  await userService.preload();
  const teamService = app.get(TeamService);
  await teamService.preload();

  await app.listen(Number(process.env.SERVER_PORT));
}
bootstrap();
