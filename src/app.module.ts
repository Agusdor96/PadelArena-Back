import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: "./.env.development",
      load:[typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (configService:ConfigService)=>
        configService.get("typeorm"),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
