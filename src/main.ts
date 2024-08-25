import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { CategoryService } from './category/category.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {UserService} from './user/user.service';
import {TeamService} from './team/team.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, 
    }))
  app.use(loggerGlobal)
  app.enableCors();

  const categoryService = app.get(CategoryService)
  await categoryService.preloadCategories()
  // const userService = app.get(UserService);
  // await userService.preload();
  // const teamService = app.get(TeamService);
  // await teamService.preload();

//Swagger config
const swaggerConfig = new DocumentBuilder()
                            .setTitle("PadelArena API")
                            .setDescription(`${""}
                              Esta es la documentacion de la API de Padel Arena.
                              ${""}
                              Padel Arena es el proyecto final creado por un grupo de 6 personas estudiantes de SoyHenry.
                              ${""}El proyecto se trata de una plataforma para ayudar a los amantes del padel a organizar torneos de una manera eficiente. 
                              ${""}Reducir al minimo los errores que suelen ocurrir, facilitarle la gestion al organizador y 
                              ${""}que los jugadores puedan enfocarse en jugar y divertirse sin inconvenientes por mala gestion.
                              ${""}
                              Un gran desafio que ayudara a la comunidad del padel a crecer.`)
                            .setVersion("1.0")
                            .addBearerAuth()
                            .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document)


  await app.listen(Number(process.env.SERVER_PORT));
}
bootstrap();
