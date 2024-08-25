import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
